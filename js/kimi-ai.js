// kimi-ai.js - Kimi AI聊天功能模块 - 版本1.0.1 (2025-03-11)
console.log("加载Kimi AI聊天功能模块 - 版本1.0.1");

// Kimi API配置
const KIMI_API_CONFIG = {
    API_KEY: "sk-Fi7lT2mDS3HqFqyQhCZl3CAff1ccwFPBDEc4enu9YBQ0FZgg", // 请替换为你的实际API密钥
    API_ENDPOINT: "https://api.moonshot.cn/v1/chat/completions",
    MODEL: "moonshot-v1-8k" // Kimi的模型名称
};

// 模拟Kimi API端点
const KIMI_API_ENDPOINT = KIMI_API_CONFIG.API_ENDPOINT;

// 聊天历史记录 - 用于保存对话上下文
let chatHistory = [];

// 初始化Kimi AI聊天
function initKimiChat() {
    console.log("初始化Kimi AI聊天功能...");
    
    // 获取DOM元素
    const chatContainer = document.getElementById('chat-container');
    const inputField = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
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
    const inputField = document.getElementById('user-input');
    const message = inputField.textContent.trim();
    
    if (message === '' || message === '输入消息...') return;
    
    // 发送用户消息
    sendUserMessage(message);
    
    // 清空输入框
    inputField.textContent = '';
}

// 发送用户消息到聊天界面
function sendUserMessage(message) {
    const chatContainer = document.getElementById('chat-container');
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
    
    // 添加到聊天历史
    chatHistory.push({
        role: "user",
        content: message
    });
    
    // 滚动到底部
    scrollToBottom();
    
    // 显示AI正在输入
    showTypingIndicator();
    
    // 发送到Kimi AI并获取回复
    processMessageWithKimi(message);
}

// 显示AI正在输入的指示器
function showTypingIndicator() {
    const chatContainer = document.getElementById('chat-container');
    
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

// 处理消息并调用 Kimi AI
function processMessageWithKimi(message) {
    // 首先显示用户消息
    sendUserMessage(message);
    
    // 显示 AI 正在输入的状态
    showTypingIndicator();
    
    // 获取当前职位上下文
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('jobId');
    let jobContext = "";
    
    if (jobId && window.jobsData) {
        const job = window.jobsData.find(j => j.id === parseInt(jobId));
        if (job) {
            jobContext = `用户正在咨询的职位信息：
职位名称: ${job.title}
公司: ${job.company}
地点: ${job.location}
薪资: ${job.salary}
要求: ${job.requirements}
福利: ${job.benefits}`;
        }
    }
    
    // 调用 Kimi API
    callKimiAPI(message, jobContext)
        .then(response => {
            // 移除输入指示器
            removeTypingIndicator();
            
            if (response && response.choices && response.choices.length > 0) {
                const aiMessage = response.choices[0].message.content;
                
                // 生成快速回复选项
                const quickReplies = generateQuickRepliesBasedOnContext(message, aiMessage);
                
                // 显示 AI 回复
                showAIReply(aiMessage, quickReplies);
            }
        })
        .catch(error => {
            console.error("Kimi API 调用失败:", error);
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
        // 构建消息历史，最多包含最近5条消息
        const recentMessages = chatHistory.slice(-5);
        
        // 构建系统消息
        const systemMessage = {
            role: "system",
            content: `你是Kimi，一个专业的蓝领招聘顾问AI助手。你的任务是帮助求职者了解职位信息、解答求职问题，并提供专业的就业建议。
请使用友好、专业的语气回答问题，回答要简洁明了，避免过长的回复。
如果你不确定某个具体信息，请诚实地表明，并提供可能的解决方案或建议用户联系招聘人员。
以下是当前用户咨询的职位背景信息，请根据这些信息回答用户的问题：
${contextInfo}`
        };
        
        // 构建完整消息数组
        const messages = [systemMessage, ...recentMessages];
        
        // 如果当前消息不在历史记录中，添加它
        if (!recentMessages.some(msg => msg.role === "user" && msg.content === userMessage)) {
            messages.push({
                role: "user",
                content: userMessage
            });
        }
        
        // 构建请求体
        const requestBody = {
            model: KIMI_API_CONFIG.MODEL,
            messages: messages,
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
    
    // 根据意图生成回复
    const reply = generateReplyBasedOnIntent(intent, userMessage);
    
    // 构建模拟API响应
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
    let defaultReplies = ["了解更多", "谢谢", "还有其他问题"];
    
    // 根据AI回复内容生成相关问题
    if (aiResponse.includes("薪资") || aiResponse.includes("工资")) {
        defaultReplies.push("有什么福利？");
    }
    
    if (aiResponse.includes("工作时间") || aiResponse.includes("班次")) {
        defaultReplies.push("需要加班吗？");
    }
    
    if (aiResponse.includes("住宿") || aiResponse.includes("宿舍")) {
        defaultReplies.push("伙食怎么样？");
    }
    
    if (aiResponse.includes("面试") || aiResponse.includes("入职")) {
        defaultReplies.push("需要准备什么材料？");
    }
    
    // 随机选择3-4个选项
    const shuffled = defaultReplies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(4, shuffled.length));
}

// 显示AI回复
function showAIReply(message, quickReplies = []) {
    const chatContainer = document.getElementById('chat-container');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // 创建AI消息容器
    const messageContainer = document.createElement('div');
    messageContainer.className = 'flex items-start mb-4';
    
    // 创建AI头像
    const aiAvatar = document.createElement('div');
    aiAvatar.className = 'ai-avatar';
    aiAvatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    // 创建消息内容容器
    const contentContainer = document.createElement('div');
    
    // 创建消息元素
    const messageElement = document.createElement('div');
    messageElement.className = 'message received';
    messageElement.innerHTML = `
        ${message}
        <div class="message-time">${timeString}</div>
    `;
    
    // 添加到内容容器
    contentContainer.appendChild(messageElement);
    
    // 如果有快速回复选项，添加它们
    if (quickReplies && quickReplies.length > 0) {
        const quickRepliesContainer = document.createElement('div');
        quickRepliesContainer.className = 'quick-replies';
        
        quickReplies.forEach(reply => {
            const quickReplyElement = document.createElement('div');
            quickReplyElement.className = 'quick-reply';
            quickReplyElement.textContent = reply;
            quickRepliesContainer.appendChild(quickReplyElement);
        });
        
        contentContainer.appendChild(quickRepliesContainer);
    }
    
    // 组装消息
    messageContainer.appendChild(aiAvatar);
    messageContainer.appendChild(contentContainer);
    
    // 添加到聊天容器
    chatContainer.appendChild(messageContainer);
    
    // 滚动到底部
    scrollToBottom();
}

// 滚动到聊天窗口底部
function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// 分析消息意图
function analyzeMessageIntent(message) {
    message = message.toLowerCase();
    
    // 工作内容相关
    if (message.includes("工作内容") || message.includes("做什么") || message.includes("工作职责")) {
        return "工作内容";
    }
    
    // 薪资相关
    if (message.includes("薪资") || message.includes("工资") || message.includes("待遇") || 
        message.includes("钱") || message.includes("多少钱")) {
        return "薪资";
    }
    
    // 要求相关
    if (message.includes("要求") || message.includes("条件") || message.includes("资格") || 
        message.includes("学历") || message.includes("经验")) {
        return "要求";
    }
    
    // 福利相关
    if (message.includes("福利") || message.includes("好处") || message.includes("保险") || 
        message.includes("公积金") || message.includes("补贴")) {
        return "福利";
    }
    
    // 住宿相关
    if (message.includes("住宿") || message.includes("宿舍") || message.includes("住") || 
        message.includes("床位") || message.includes("食堂")) {
        return "住宿";
    }
    
    // 入职流程相关
    if (message.includes("入职") || message.includes("流程") || message.includes("加入") || 
        message.includes("报到") || message.includes("材料") || message.includes("证件")) {
        return "入职流程";
    }
    
    // 默认为一般咨询
    return "一般咨询";
}

// 根据意图生成回复
function generateReplyBasedOnIntent(intent, originalMessage) {
    switch (intent) {
        case "工作内容":
            return {
                message: "这个岗位主要负责产品的组装、检测和包装工作。根据不同产线安排，可能会有不同的具体任务，如元器件安装、产品组装、质量检验等。工作环境整洁，有空调，通常需要站立工作，每天工作时间为8-10小时，含休息时间。",
                quickReplies: ["需要倒班吗？", "有培训吗？", "需要加班吗？", "工作强度大吗？"]
            };
            
        case "薪资":
            return {
                message: "基本工资为3000-4000元/月，另有绩效奖金、全勤奖、夜班补贴等。正常工作下，月收入约6000-8000元。加班费按国家规定计算：工作日加班1.5倍、休息日加班2倍、法定节假日加班3倍。薪资按月发放，每月10日前发上月工资，直接打入工资卡。",
                quickReplies: ["有什么福利？", "需要加班吗？", "有年终奖吗？", "试用期工资怎么算？"]
            };
            
        case "要求":
            return {
                message: "这个岗位的基本要求是：年龄18-45岁，身体健康，能适应站立工作。学历要求初中及以上，无需工作经验，公司会提供岗前培训。需要有基本的识字能力和简单计算能力，能够理解工作指令。视力要求正常，无色盲色弱。",
                quickReplies: ["有体检要求吗？", "需要什么证件？", "有性别限制吗？", "培训要多久？"]
            };
            
        case "福利":
            return {
                message: "公司提供以下福利：1. 五险一金（养老、医疗、失业、工伤、生育保险和住房公积金）；2. 免费工作餐或餐补；3. 免费厂车或交通补贴；4. 免费住宿（6-8人间）；5. 带薪年假、婚假、产假等法定假期；6. 节日福利和生日福利；7. 定期体检；8. 内部晋升机会和技能培训。",
                quickReplies: ["住宿条件怎么样？", "伙食怎么样？", "有娱乐设施吗？", "转正后待遇有变化吗？"]
            };
            
        case "住宿":
            return {
                message: "公司提供免费的员工宿舍，标准是6-8人间，上下铺床位，配有空调、热水器和基础家具（衣柜、桌椅等）。宿舍楼内有公共卫浴设施，每层楼约有4-6个卫浴间。宿舍区有洗衣房、小超市、食堂和休闲区。如果您希望住条件更好的宿舍，公司也提供2-4人间的优质宿舍，但需要支付一定的住宿费（约200-400元/月）。",
                quickReplies: ["伙食怎么样？", "宿舍有网络吗？", "可以自己租房吗？", "宿舍管理严格吗？"]
            };
            
        case "入职流程":
            return {
                message: "入职流程如下：1. 准备材料：身份证原件及复印件、学历证明、近期免冠照片2-4张、银行卡；2. 填写入职申请表；3. 参加入职体检；4. 参加岗前培训（3-7天，有培训补贴）；5. 签订劳动合同；6. 领取工牌和工作用品；7. 安排住宿；8. 正式上岗。整个流程约需5-7个工作日完成。",
                quickReplies: ["体检项目有哪些？", "需要押金吗？", "什么时候可以入职？", "培训有工资吗？"]
            };
            
        default:
            // 一般咨询或无法识别的意图
            if (originalMessage.includes("你好") || originalMessage.includes("您好") || originalMessage.includes("hi") || originalMessage.includes("hello")) {
                return {
                    message: "您好！我是蓝领招聘的AI助手，很高兴为您服务。我可以回答您关于招聘职位的各种问题，包括工作内容、薪资待遇、入职要求、公司福利等。请问您想了解什么呢？",
                    quickReplies: ["热门职位推荐", "如何准备面试", "薪资行情如何", "求职技巧分享"]
                };
            } else if (originalMessage.includes("谢谢") || originalMessage.includes("感谢")) {
                return {
                    message: "不客气！很高兴能帮到您。如果您还有其他问题，随时可以向我咨询。祝您求职顺利！",
                    quickReplies: ["还有其他问题", "再见"]
                };
            } else {
                return {
                    message: "感谢您的咨询。我理解您想了解更多关于这个职位的信息。您可以具体询问工作内容、薪资待遇、入职要求、公司福利、住宿条件或入职流程等方面的问题，我会尽力为您解答。",
                    quickReplies: ["工作内容是什么？", "薪资怎么算？", "需要什么条件？", "有什么福利？"]
                };
            }
    }
}

// 导出函数
window.initKimiChat = initKimiChat;
window.showAIReply = showAIReply;
window.processMessageWithKimi = processMessageWithKimi;
window.sendUserMessage = sendUserMessage;
window.sendMessage = sendMessage;

// 全局范围内也直接暴露这些函数
var initKimiChat = window.initKimiChat;
var showAIReply = window.showAIReply;
var processMessageWithKimi = window.processMessageWithKimi;
var sendUserMessage = window.sendUserMessage;
var sendMessage = window.sendMessage;
