// kimi-ai.js - Kimi AI聊天功能模块

// Kimi API配置
const KIMI_API_CONFIG = {
    API_KEY: "YOUR_KIMI_API_KEY", // 请替换为你的实际API密钥
    API_ENDPOINT: "https://api.moonshot.cn/v1/chat/completions",
    MODEL: "moonshot-v1-8k" // Kimi的模型名称
};

// 模拟Kimi AI API端点
const KIMI_API_ENDPOINT = KIMI_API_CONFIG.API_ENDPOINT;

// 职位数据库 - 现在从job-data.js导入

// 初始化Kimi AI聊天
function initKimiChat() {
    console.log("初始化Kimi AI聊天功能...");
    
    // 获取DOM元素
    const chatContainer = document.querySelector('.chat-container');
    const inputField = document.querySelector('.input-field');
    const sendButton = document.querySelector('.send-btn');
    
    // 清除输入框的默认文本
    inputField.addEventListener('focus', function() {
        if (this.textContent === '输入消息...') {
            this.textContent = '';
        }
    });
    
    inputField.addEventListener('blur', function() {
        if (this.textContent.trim() === '') {
            this.textContent = '输入消息...';
        }
    });
    
    // 发送消息事件
    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 快速回复点击事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-reply')) {
            const message = e.target.textContent;
            sendUserMessage(message);
        }
    });
    
    // 返回按钮事件
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.parent.postMessage({ action: 'navigate', page: 'index.html' }, '*');
        });
    }
    
    // 初始化完成后滚动到底部
    scrollToBottom();
}

// 发送消息函数
function sendMessage() {
    const inputField = document.querySelector('.input-field');
    const message = inputField.textContent.trim();
    
    if (message === '' || message === '输入消息...') return;
    
    // 发送用户消息
    sendUserMessage(message);
    
    // 清空输入框
    inputField.textContent = '';
}

// 发送用户消息到聊天界面
function sendUserMessage(message) {
    const chatContainer = document.querySelector('.chat-container');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // 创建用户消息元素
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        ${message}
        <div class="message-time">${timeString}</div>
    `;
    
    // 添加到聊天容器
    chatContainer.appendChild(messageElement);
    
    // 滚动到底部
    scrollToBottom();
    
    // 显示AI正在输入
    showTypingIndicator();
    
    // 发送到Kimi AI并获取回复
    processMessageWithKimi(message);
}

// 显示AI正在输入的指示器
function showTypingIndicator() {
    const chatContainer = document.querySelector('.chat-container');
    
    // 创建AI头像和消息容器
    const typingContainer = document.createElement('div');
    typingContainer.className = 'flex items-start mb-4 typing-indicator';
    typingContainer.innerHTML = `
        <div class="ai-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div>
            <div class="message received">
                <div class="typing-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </div>
    `;
    
    // 添加到聊天容器
    chatContainer.appendChild(typingContainer);
    
    // 滚动到底部
    scrollToBottom();
}

// 移除AI正在输入的指示器
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// 使用Kimi AI处理消息
function processMessageWithKimi(message) {
    // 显示AI正在输入
    showTypingIndicator();
    
    // 获取当前职位信息
    let jobContext = "";
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('jobId');
    
    if (jobId && window.jobsData) {
        const job = window.jobsData.find(j => j.id === jobId);
        if (job) {
            jobContext = `用户正在咨询的职位信息：
职位名称: ${job.title}
公司: ${job.company}
地点: ${job.location}
薪资: ${job.salary}
要求: ${job.requirements ? job.requirements.join(', ') : '无特殊要求'}
福利: ${job.benefits ? job.benefits.join(', ') : '暂无详细福利信息'}
`;
        }
    }
    
    // 调用Kimi API
    callKimiAPI(message, jobContext)
        .then(response => {
            // 移除输入指示器
            removeTypingIndicator();
            
            // 处理API响应
            if (response && response.choices && response.choices.length > 0) {
                const aiMessage = response.choices[0].message.content;
                
                // 生成快速回复选项
                const quickReplies = generateQuickRepliesBasedOnContext(message, aiMessage);
                
                // 显示AI回复
                showAIReply(aiMessage, quickReplies);
            } else {
                // 处理API错误
                showAIReply("抱歉，我暂时无法回答您的问题。请稍后再试。", ["重新提问", "联系客服"]);
            }
        })
        .catch(error => {
            console.error("Kimi API调用失败:", error);
            removeTypingIndicator();
            
            // 降级到本地回复逻辑
            const intent = analyzeMessageIntent(message);
            const reply = generateReplyBasedOnIntent(intent, message);
            showAIReply(reply.message, reply.quickReplies);
        });
}

// 调用Kimi API
async function callKimiAPI(userMessage, contextInfo = "") {
    try {
        // 构建请求体
        const requestBody = {
            model: KIMI_API_CONFIG.MODEL,
            messages: [
                {
                    role: "system",
                    content: `你是Kimi，一个专业的蓝领招聘顾问AI助手。你的任务是帮助求职者了解职位信息、解答求职问题，并提供专业的就业建议。
请使用友好、专业的语气回答问题，回答要简洁明了，避免过长的回复。
如果你不确定某个具体信息，请诚实地表明，并提供可能的解决方案或建议用户联系招聘人员。
以下是当前用户咨询的职位背景信息，请根据这些信息回答用户的问题：
${contextInfo}`
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
            temperature: 0.7,
            max_tokens: 800
        };
        
        // 检查是否在开发环境
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log("开发环境: 模拟Kimi API调用", requestBody);
            // 返回模拟数据
            return mockKimiAPIResponse(userMessage);
        }
        
        // 发送API请求
        const response = await fetch(KIMI_API_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${KIMI_API_CONFIG.API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });
        
        // 检查响应状态
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Kimi API错误:", errorData);
            throw new Error(`API请求失败: ${response.status}`);
        }
        
        // 解析响应
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("调用Kimi API时出错:", error);
        throw error;
    }
}

// 模拟Kimi API响应（用于开发环境）
function mockKimiAPIResponse(userMessage) {
    // 分析消息意图
    const intent = analyzeMessageIntent(userMessage);
    const reply = generateReplyBasedOnIntent(intent, userMessage);
    
    // 构建模拟的API响应格式
    return {
        id: "mock-response-" + Date.now(),
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: KIMI_API_CONFIG.MODEL,
        choices: [
            {
                index: 0,
                message: {
                    role: "assistant",
                    content: reply.message
                },
                finish_reason: "stop"
            }
        ],
        usage: {
            prompt_tokens: userMessage.length,
            completion_tokens: reply.message.length,
            total_tokens: userMessage.length + reply.message.length
        }
    };
}

// 根据上下文生成快速回复选项
function generateQuickRepliesBasedOnContext(userMessage, aiResponse) {
    // 默认快速回复选项
    const defaultReplies = ["薪资待遇如何？", "需要什么条件？", "工作时间怎样？"];
    
    // 根据用户消息和AI回复分析可能的后续问题
    const message = userMessage.toLowerCase();
    
    if (message.includes("薪资") || message.includes("工资")) {
        return ["有什么福利？", "需要什么条件？", "怎么申请这个职位？"];
    } else if (message.includes("要求") || message.includes("条件")) {
        return ["薪资待遇如何？", "工作时间怎样？", "有培训吗？"];
    } else if (message.includes("工作时间") || message.includes("上班时间")) {
        return ["有加班费吗？", "薪资待遇如何？", "住宿条件如何？"];
    } else if (message.includes("公司") || message.includes("企业")) {
        return ["公司规模多大？", "有晋升机会吗？", "薪资待遇如何？"];
    } else if (aiResponse.includes("联系") || aiResponse.includes("咨询")) {
        return ["怎么联系招聘人员？", "有其他类似职位吗？", "谢谢您的帮助"];
    }
    
    return defaultReplies;
}

// 显示AI回复
function showAIReply(message, quickReplies = []) {
    const chatContainer = document.querySelector('.chat-container');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // 创建AI消息元素
    const messageContainer = document.createElement('div');
    messageContainer.className = 'flex items-start mb-4';
    
    // 构建HTML
    let quickRepliesHTML = '';
    if (quickReplies && quickReplies.length > 0) {
        quickRepliesHTML = `
            <div class="quick-replies">
                ${quickReplies.map(reply => `<div class="quick-reply">${reply}</div>`).join('')}
            </div>
        `;
    }
    
    messageContainer.innerHTML = `
        <div class="ai-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div>
            <div class="message received">
                ${message}
                <div class="message-time">${timeString}</div>
            </div>
            ${quickRepliesHTML}
        </div>
    `;
    
    // 添加到聊天容器
    chatContainer.appendChild(messageContainer);
    
    // 滚动到底部
    scrollToBottom();
}

// 滚动到聊天窗口底部
function scrollToBottom() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 分析消息意图
function analyzeMessageIntent(message) {
    message = message.toLowerCase();
    
    // 定义意图关键词
    const intentKeywords = {
        salary: ['薪资', '工资', '钱', '待遇', '多少钱', '报酬', '收入'],
        requirements: ['要求', '条件', '资格', '学历', '经验', '技能', '能力', '需要什么'],
        benefits: ['福利', '保险', '五险', '一金', '补贴', '奖金', '年终奖'],
        shifts: ['班次', '倒班', '上班时间', '工作时间', '休息', '轮班', '夜班', '白班'],
        accommodation: ['住宿', '宿舍', '住', '几人间', '卫浴', '条件', '环境'],
        training: ['培训', '学习', '教育', '成长', '发展', '晋升', '提升'],
        interview: ['面试', '入职', '流程', '准备', '需要带', '资料', '证件'],
        workContent: ['工作内容', '做什么', '职责', '任务', '工作描述', '具体工作'],
        overtime: ['加班', '额外工作', '工作量', '忙吗', '辛苦吗'],
        location: ['地点', '地址', '在哪', '位置', '怎么去', '交通', '路线'],
        company: ['公司', '企业', '规模', '背景', '怎么样', '好不好']
    };
    
    // 检查消息中的关键词
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
        for (const keyword of keywords) {
            if (message.includes(keyword)) {
                return intent;
            }
        }
    }
    
    // 默认意图
    return 'general';
}

// 根据意图生成回复
function generateReplyBasedOnIntent(intent, originalMessage) {
    // 获取当前职位信息
    const currentJob = window.jobsData ? window.jobsData.find(job => job.title === "电子厂普工") : null;
    
    // 如果没有找到职位数据，使用默认回复
    if (!currentJob && intent !== 'general') {
        return {
            message: "非常抱歉，我目前无法获取这个职位的详细信息。您可以直接联系招聘人员了解更多详情。您还有其他问题吗？",
            quickReplies: ["联系招聘人员", "查看其他职位", "了解公司信息"]
        };
    }
    
    // 根据意图生成回复
    switch (intent) {
        case 'salary':
            return {
                message: `这个岗位的薪资范围是${currentJob.salary}。薪资构成包括：基本工资+加班费+绩效奖金+各类补贴。正常工作日加班1.5倍工资，休息日加班2倍工资，法定节假日加班3倍工资。试用期工资为转正后的80%，试用期为1个月。`,
                quickReplies: ["加班情况如何？", "有什么福利？", "工资几号发？"]
            };
            
        case 'requirements':
            return {
                message: `应聘条件：${currentJob.requirements}。我们欢迎各类人才加入，无需太多工作经验，公司会提供岗前培训。需要注意的是，入职需要带身份证原件、学历证明、健康证（可入职后办理）和2寸照片若干。`,
                quickReplies: ["有培训吗？", "需要体检吗？", "可以现场面试吗？"]
            };
            
        case 'benefits':
            return {
                message: `我们提供的福利待遇包括：${currentJob.benefits}。此外，工作满一年后可享受带薪年假，表现优秀的员工有机会获得晋升和加薪。公司还会定期组织团建活动和节日庆祝。`,
                quickReplies: ["住宿条件如何？", "有餐补吗？", "有交通补贴吗？"]
            };
            
        case 'shifts':
            return {
                message: `工作时间安排：${currentJob.shifts}。每月休息4天，可根据产线需求调整。加班情况视订单量而定，旺季可能会有较多加班机会，淡季相对较少。加班是自愿的，但可以增加收入。`,
                quickReplies: ["倒班补贴多少？", "休息怎么安排？", "加班费怎么算？"]
            };
            
        case 'accommodation':
            return {
                message: "公司提供免费的员工宿舍，标准为6-8人间，配有空调、热水器和公共卫生间。宿舍区有洗衣房、小超市、食堂和休闲区。如果您希望住条件更好的宿舍，公司也提供2-4人间的优质宿舍，但需要支付一定的住宿费（约200-400元/月）。",
                quickReplies: ["有独立卫浴吗？", "可以自己租房吗？", "宿舍有网络吗？"]
            };
            
        case 'training':
            return {
                message: "公司为新员工提供为期一周的岗前培训，内容包括公司文化、安全生产、操作技能等。此外，表现优秀的员工有机会参加技能提升培训，为晋升打下基础。我们鼓励员工不断学习和成长，有完善的内部晋升通道。",
                quickReplies: ["晋升机会如何？", "培训有补贴吗？", "可以转岗吗？"]
            };
            
        case 'interview':
            return {
                message: "入职流程很简单：1. 投递简历或直接到工厂招聘处登记；2. 参加面试（主要是了解基本情况，没有难度）；3. 体检；4. 入职培训；5. 正式上岗。面试时需要带身份证原件和复印件，如果当场通过可以安排住宿，最快3天内可以正式上岗。",
                quickReplies: ["可以直接去面试吗？", "需要准备什么？", "多久能入职？"]
            };
            
        case 'workContent':
            return {
                message: `工作内容：${currentJob.description}。具体来说，您可能会负责电子元器件的组装、焊接、检测或包装等工作。工作环境是无尘车间，需要穿工作服和佩戴手套等防护装备。工作强度适中，但需要长时间站立或坐姿操作。`,
                quickReplies: ["需要什么技能？", "工作环境如何？", "工作强度大吗？"]
            };
            
        case 'overtime':
            return {
                message: "加班情况视订单量而定，旺季（通常是节假日前和新品发布前）会有较多加班机会，淡季相对较少。加班是自愿的，但可以增加收入。正常工作日加班1.5倍工资，休息日加班2倍工资，法定节假日加班3倍工资。月均加班时间约30-40小时。",
                quickReplies: ["休息怎么安排？", "加班费怎么算？", "可以拒绝加班吗？"]
            };
            
        case 'location':
            return {
                message: `工作地点位于${currentJob.location}。公司有免费班车接送，覆盖主要居住区和交通枢纽。如果自行前往，可以乘坐地铁或公交到附近站点，步行约10分钟可到。厂区周边有商场、医院、银行等配套设施，生活便利。`,
                quickReplies: ["有班车吗？", "周边环境如何？", "可以自己租房吗？"]
            };
            
        case 'company':
            const company = window.companiesData ? window.companiesData.find(comp => comp.name === "富士康科技集团") : null;
            if (company) {
                return {
                    message: `${company.name}是${company.description}公司成立于${company.founded}，现有员工${company.size}。企业文化：${company.culture}`,
                    quickReplies: ["公司规模如何？", "发展前景怎样？", "工作氛围如何？"]
                };
            } else {
                return {
                    message: "富士康科技集团是全球最大的电子产品代工企业，为苹果、华为等知名品牌提供代工服务。公司成立于1974年，现有员工超过10万人。公司注重效率和质量，工作节奏较快，管理规范。",
                    quickReplies: ["公司规模如何？", "发展前景怎样？", "工作氛围如何？"]
                };
            }
            
        default:
            // 处理一般性问题或未识别的意图
            if (originalMessage.includes("你好") || originalMessage.includes("您好")) {
                return {
                    message: "您好！我是富士康的AI招聘助手，由Kimi提供智能支持。很高兴为您服务！您可以向我咨询关于职位、薪资、福利、工作环境等任何问题，我会尽力为您解答。",
                    quickReplies: ["工作内容是什么？", "薪资怎么算？", "需要什么条件？", "有什么福利？"]
                };
            } else if (originalMessage.includes("谢谢") || originalMessage.includes("感谢")) {
                return {
                    message: "不客气！为您服务是我的荣幸。如果您还有其他问题，随时可以向我咨询。祝您求职顺利！",
                    quickReplies: ["我想应聘这个职位", "查看其他职位", "联系招聘人员"]
                };
            } else if (originalMessage.includes("再见") || originalMessage.includes("拜拜")) {
                return {
                    message: "再见！感谢您的咨询。希望我的回答对您有所帮助。如果之后有任何问题，欢迎随时回来咨询。祝您生活愉快！",
                    quickReplies: ["我想应聘这个职位", "查看其他职位", "稍后再联系"]
                };
            } else {
                return {
                    message: "非常抱歉，我可能没有完全理解您的问题。您可以尝试用更简单的方式描述，或者直接点击下方的快速回复选项来了解相关信息。您也可以咨询薪资、福利、工作内容、入职要求等具体问题。",
                    quickReplies: ["工作内容是什么？", "薪资怎么算？", "需要什么条件？", "有什么福利？"]
                };
            }
    }
}

// 导出函数
window.initKimiChat = initKimiChat;
