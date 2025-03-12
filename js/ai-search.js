// ai-search.js - AI智能搜索功能

/**
 * 根据关键词在职位数据中进行搜索
 * @param {string} query - 搜索关键词
 * @returns {Object} - 包含匹配的职位和生成的回复
 */
function searchJobsByKeyword(query) {
    console.log("正在搜索关键词:", query);
    
    // 如果没有提供查询词或全局职位数据不存在，返回空结果
    if (!query || !window.jobsData) {
        return {
            matchedJobs: [],
            response: "抱歉，我无法找到相关信息。请尝试其他关键词。"
        };
    }
    
    // 将查询词转换为小写并分割成关键词数组
    const keywords = query.toLowerCase().split(/\s+/);
    
    // 在职位数据中搜索匹配的职位
    const matchedJobs = window.jobsData.filter(job => {
        // 检查职位标题、公司名称、地点、描述、要求和福利是否包含关键词
        const jobText = (
            job.title + " " + 
            job.company + " " + 
            job.location + " " + 
            job.description + " " + 
            job.requirements + " " + 
            job.benefits + " " +
            job.salary + " " +
            job.tags.join(" ")
        ).toLowerCase();
        
        // 如果任一关键词匹配，返回true
        return keywords.some(keyword => jobText.includes(keyword));
    });
    
    // 生成回复内容
    let response = "";
    if (matchedJobs.length > 0) {
        response = `我找到了${matchedJobs.length}个与"${query}"相关的职位：\n\n`;
        
        // 最多显示前3个匹配的职位
        const topJobs = matchedJobs.slice(0, 3);
        topJobs.forEach((job, index) => {
            response += `${index + 1}. ${job.title} - ${job.company}\n`;
            response += `   📍 ${job.location}\n`;
            response += `   💰 ${job.salary}\n`;
            response += `   📝 ${job.description}\n\n`;
        });
        
        if (matchedJobs.length > 3) {
            response += `还有${matchedJobs.length - 3}个相关职位未显示，您可以在首页搜索"${query}"查看更多结果，\n\n`;
        }
        
        response += "您对这些职位有什么想了解的吗？例如薪资待遇、工作要求、公司环境等，您也可以点击下方的"查看职位详情"按钮查看完整信息。";
    } else {
        response = `抱歉，我没有找到与"${query}"相关的职位。您可以尝试其他关键词，如"普工"、"包吃住"、"高薪"等。`;
    }
    
    // 保存最近匹配的职位到全局变量，以便后续使用
    window.lastMatchedJobs = matchedJobs;
    
    return {
        matchedJobs: matchedJobs,
        response: response
    };
}

/**
 * 根据上下文生成快速回复选项
 * @param {string} userMessage - 用户消息
 * @param {string} aiResponse - AI回复
 * @returns {Array} - 快速回复选项数组
 */
function generateQuickRepliesBasedOnContext(userMessage, aiResponse) {
    // 默认快速回复选项
    let quickReplies = ['查看职位详情', '申请流程', '联系方式'];
    
    // 根据用户消息和AI回复生成相关的快速回复选项
    if (userMessage.includes('薪资') || userMessage.includes('工资') || userMessage.includes('待遇')) {
        quickReplies = ['五险一金详情', '加班费怎么算', '有哪些补贴'];
    } else if (userMessage.includes('要求') || userMessage.includes('条件') || userMessage.includes('资格')) {
        quickReplies = ['需要什么证书', '年龄要求', '经验要求'];
    } else if (userMessage.includes('地址') || userMessage.includes('位置') || userMessage.includes('在哪')) {
        quickReplies = ['怎么去公司', '有班车吗', '附近有宿舍吗'];
    } else if (userMessage.includes('面试') || userMessage.includes('入职')) {
        quickReplies = ['面试流程', '需要带什么', '入职时间'];
    }
    
    // 如果AI回复中包含职位信息，添加相关快速回复
    if (aiResponse.includes('职位') && window.lastMatchedJobs && window.lastMatchedJobs.length > 0) {
        if (!quickReplies.includes('查看职位详情')) {
            quickReplies.push('查看职位详情');
        }
    }
    
    return quickReplies;
}

/**
 * 处理快速回复点击事件
 * @param {string} replyText - 快速回复文本
 * @returns {boolean} - 是否已处理
 */
function handleQuickReplyClick(replyText) {
    // 如果点击的是"查看职位详情"并且有匹配的职位
    if (replyText === '查看职位详情' && window.lastMatchedJobs && window.lastMatchedJobs.length > 0) {
        // 获取第一个匹配的职位
        const firstJob = window.lastMatchedJobs[0];
        
        // 如果有多个匹配的职位，显示职位选择对话框
        if (window.lastMatchedJobs.length > 1) {
            showJobSelectionDialog(window.lastMatchedJobs);
        } else {
            // 如果只有一个匹配的职位，直接跳转到详情页面
            window.location.href = `job_detail.html?jobId=${firstJob.id}`;
        }
        
        return true; // 表示已处理
    }
    
    return false; // 表示未处理
}

/**
 * 显示职位选择对话框
 * @param {Array} jobs - 匹配的职位数组
 */
function showJobSelectionDialog(jobs) {
    // 创建对话框容器
    const dialogOverlay = document.createElement('div');
    dialogOverlay.className = 'dialog-overlay';
    dialogOverlay.style.position = 'fixed';
    dialogOverlay.style.top = '0';
    dialogOverlay.style.left = '0';
    dialogOverlay.style.width = '100%';
    dialogOverlay.style.height = '100%';
    dialogOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    dialogOverlay.style.zIndex = '1000';
    dialogOverlay.style.display = 'flex';
    dialogOverlay.style.justifyContent = 'center';
    dialogOverlay.style.alignItems = 'center';
    
    // 创建对话框内容
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';
    dialogContent.style.width = '90%';
    dialogContent.style.maxWidth = '400px';
    dialogContent.style.backgroundColor = 'white';
    dialogContent.style.borderRadius = '12px';
    dialogContent.style.padding = '20px';
    dialogContent.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    
    // 创建对话框标题
    const dialogTitle = document.createElement('div');
    dialogTitle.className = 'dialog-title';
    dialogTitle.style.fontSize = '18px';
    dialogTitle.style.fontWeight = 'bold';
    dialogTitle.style.marginBottom = '15px';
    dialogTitle.style.textAlign = 'center';
    dialogTitle.textContent = '请选择要查看的职位';
    
    // 创建职位列表
    const jobList = document.createElement('div');
    jobList.className = 'job-list';
    jobList.style.maxHeight = '300px';
    jobList.style.overflowY = 'auto';
    
    // 最多显示前5个匹配的职位
    const displayJobs = jobs.slice(0, 5);
    
    // 添加职位选项
    displayJobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'job-item';
        jobItem.style.padding = '12px';
        jobItem.style.borderBottom = '1px solid #eee';
        jobItem.style.cursor = 'pointer';
        jobItem.style.display = 'flex';
        jobItem.style.alignItems = 'center';
        
        // 添加职位图标
        const jobIcon = document.createElement('div');
        jobIcon.className = 'job-icon';
        jobIcon.style.width = '40px';
        jobIcon.style.height = '40px';
        jobIcon.style.borderRadius = '8px';
        jobIcon.style.marginRight = '12px';
        jobIcon.style.backgroundImage = `url(${job.logo})`;
        jobIcon.style.backgroundSize = 'cover';
        jobIcon.style.backgroundPosition = 'center';
        
        // 添加职位信息
        const jobInfo = document.createElement('div');
        jobInfo.className = 'job-info';
        jobInfo.style.flex = '1';
        
        // 添加职位标题
        const jobTitle = document.createElement('div');
        jobTitle.className = 'job-title';
        jobTitle.style.fontWeight = 'bold';
        jobTitle.style.marginBottom = '4px';
        jobTitle.textContent = job.title;
        
        // 添加公司名称和薪资
        const jobMeta = document.createElement('div');
        jobMeta.className = 'job-meta';
        jobMeta.style.fontSize = '12px';
        jobMeta.style.color = '#666';
        jobMeta.textContent = `${job.company} · ${job.salary}`;
        
        // 组装职位信息
        jobInfo.appendChild(jobTitle);
        jobInfo.appendChild(jobMeta);
        
        // 组装职位项
        jobItem.appendChild(jobIcon);
        jobItem.appendChild(jobInfo);
        
        // 添加点击事件
        jobItem.addEventListener('click', function() {
            window.location.href = `job_detail.html?jobId=${job.id}`;
        });
        
        // 添加到职位列表
        jobList.appendChild(jobItem);
    });
    
    // 创建关闭按钮
    const closeButton = document.createElement('div');
    closeButton.className = 'close-button';
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = '#f5f5f5';
    closeButton.style.borderRadius = '8px';
    closeButton.style.textAlign = 'center';
    closeButton.style.cursor = 'pointer';
    closeButton.textContent = '关闭';
    
    // 添加关闭按钮点击事件
    closeButton.addEventListener('click', function() {
        document.body.removeChild(dialogOverlay);
    });
    
    // 组装对话框
    dialogContent.appendChild(dialogTitle);
    dialogContent.appendChild(jobList);
    dialogContent.appendChild(closeButton);
    dialogOverlay.appendChild(dialogContent);
    
    // 添加到页面
    document.body.appendChild(dialogOverlay);
}

/**
 * 模拟调用Kimi API（实际使用关键词搜索）
 * @param {string} message - 用户消息
 * @param {string} jobContext - 职位上下文
 * @returns {Promise} - 返回搜索结果的Promise
 */
function callKimiAPI(message, jobContext) {
    console.log("模拟调用Kimi API，实际使用关键词搜索");
    console.log("用户消息:", message);
    console.log("职位上下文:", jobContext);
    
    return new Promise((resolve, reject) => {
        try {
            // 使用关键词搜索替代实际的API调用
            const searchResult = searchJobsByKeyword(message);
            
            // 将搜索结果格式化为类似API返回的格式
            const response = {
                choices: [
                    {
                        message: {
                            content: searchResult.response
                        }
                    }
                ],
                matchedJobs: searchResult.matchedJobs
            };
            
            // 延迟500ms模拟网络请求
            setTimeout(() => {
                resolve(response);
            }, 500);
        } catch (error) {
            console.error("搜索过程中出错:", error);
            reject(error);
        }
    });
}

// 将函数暴露给全局作用域
window.searchJobsByKeyword = searchJobsByKeyword;
window.generateQuickRepliesBasedOnContext = generateQuickRepliesBasedOnContext;
window.callKimiAPI = callKimiAPI;
window.handleQuickReplyClick = handleQuickReplyClick;
window.showJobSelectionDialog = showJobSelectionDialog;
