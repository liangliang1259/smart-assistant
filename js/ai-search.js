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
            response += `还有${matchedJobs.length - 3}个相关职位未显示。您可以在首页搜索"${query}"查看更多结果。\n\n`;
        }
        
        response += "您对这些职位有什么想了解的吗？例如薪资待遇、工作要求、公司环境等。";
    } else {
        response = `抱歉，我没有找到与"${query}"相关的职位。您可以尝试其他关键词，如"普工"、"包吃住"、"高薪"等。`;
    }
    
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
    if (aiResponse.includes('职位')) {
        if (!quickReplies.includes('查看职位详情')) {
            quickReplies.push('查看职位详情');
        }
    }
    
    return quickReplies;
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
