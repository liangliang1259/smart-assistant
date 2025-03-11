// 全局变量，用于存储当前页面状态
let currentPage = window.location.pathname.split('/').pop();

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏事件监听
    initNavigation();
    
    // 初始化页面特定功能
    initPageSpecificFunctions();
    
    // 初始化返回按钮功能
    initBackButton();
    
    // 初始化AI聊天功能
    initAIChat();
});

// 初始化导航栏事件监听
function initNavigation() {
    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');
    
    // 为每个导航项添加点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取目标页面
            const targetPage = this.getAttribute('data-page');
            
            // 如果在iframe中，则通知父页面切换
            if (window.parent !== window) {
                window.parent.postMessage({
                    action: 'navigate',
                    page: targetPage
                }, '*');
            } else {
                // 直接导航到目标页面
                window.location.href = targetPage;
            }
        });
    });
    
    // 监听来自iframe的消息
    window.addEventListener('message', function(event) {
        // 处理导航消息
        if (event.data.action === 'navigate') {
            // 在index.html中处理iframe导航
            const iframe = document.getElementById('content-frame');
            if (iframe) {
                iframe.src = event.data.page;
                
                // 更新导航栏活跃状态
                updateActiveNavItem(event.data.page);
            }
        }
    });
}

// 更新导航栏活跃状态
function updateActiveNavItem(page) {
    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');
    
    // 移除所有活跃状态
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 为当前页面添加活跃状态
    const activeItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// 初始化返回按钮功能
function initBackButton() {
    // 获取所有返回按钮
    const backButtons = document.querySelectorAll('.back-button');
    
    // 为每个返回按钮添加点击事件
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 如果在iframe中，则返回到主页
            if (window.parent !== window) {
                window.parent.postMessage({
                    action: 'navigate',
                    page: 'home.html'
                }, '*');
            } else {
                // 直接返回到主页
                window.location.href = 'home.html';
            }
        });
    });
}

// 初始化页面特定功能
function initPageSpecificFunctions() {
    // 根据当前页面路径初始化特定功能
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'home.html':
            initHomePage();
            break;
        case 'job_detail.html':
            initJobDetailPage();
            break;
        case 'search.html':
            initSearchPage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
        case 'application_status.html':
            initApplicationStatusPage();
            break;
        case 'index.html':
            initIndexPage();
            break;
    }
}

// 初始化首页功能
function initHomePage() {
    // 职位卡片点击事件 - 跳转到职位详情页
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            navigateTo('job_detail.html');
        });
    });
    
    // AI沟通按钮点击事件
    const aiChatButtons = document.querySelectorAll('.text-blue-500');
    aiChatButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡到职位卡片
            navigateTo('ai_chat.html');
        });
    });
    
    // 分类标签点击事件
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有活跃状态
            categoryTabs.forEach(t => t.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
        });
    });
}

// 初始化职位详情页功能
function initJobDetailPage() {
    // 投递简历按钮点击事件
    const applyButton = document.querySelector('.action-btn.bg-blue-100');
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            alert('简历已投递成功！');
        });
    }
    
    // AI智能沟通按钮点击事件
    const aiChatButton = document.querySelector('.action-btn.bg-blue-600');
    if (aiChatButton) {
        aiChatButton.addEventListener('click', function() {
            navigateTo('ai_chat.html');
        });
    }
    
    // 收藏按钮点击事件
    const collectButton = document.querySelector('.collect-btn');
    if (collectButton) {
        collectButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            
            const icon = this.querySelector('.collect-icon');
            if (icon.classList.contains('far')) {
                // 未收藏 -> 已收藏
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#f59e0b';
                alert('职位已收藏！');
            } else {
                // 已收藏 -> 取消收藏
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '#666';
                alert('已取消收藏！');
            }
        });
    }
}

// 初始化AI聊天页面功能
function initAIChat() {
    // 获取输入框和发送按钮
    const inputField = document.querySelector('.input-field');
    const sendButton = document.querySelector('.send-btn');
    
    // 如果页面上有这些元素
    if (inputField && sendButton) {
        // 输入框点击事件
        inputField.addEventListener('click', function() {
            if (this.textContent === '输入消息...') {
                this.textContent = '';
                this.style.color = '#333';
            }
        });
        
        // 发送按钮点击事件
        sendButton.addEventListener('click', function() {
            sendMessage();
        });
        
        // 快速回复点击事件
        const quickReplies = document.querySelectorAll('.quick-reply');
        quickReplies.forEach(reply => {
            reply.addEventListener('click', function() {
                const message = this.textContent;
                inputField.textContent = message;
                sendMessage();
            });
        });
        
        // 发送消息函数
        function sendMessage() {
            const message = inputField.textContent.trim();
            if (message && message !== '输入消息...') {
                // 创建用户消息元素
                const chatContainer = document.querySelector('.chat-container');
                const messageElement = document.createElement('div');
                messageElement.className = 'message sent';
                
                // 获取当前时间
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const timeString = `${hours}:${minutes}`;
                
                // 设置消息内容
                messageElement.innerHTML = `
                    ${message}
                    <div class="message-time">${timeString}</div>
                `;
                
                // 添加到聊天容器
                chatContainer.appendChild(messageElement);
                
                // 清空输入框
                inputField.textContent = '输入消息...';
                inputField.style.color = '#999';
                
                // 滚动到底部
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // 模拟AI回复
                setTimeout(() => {
                    // 创建AI回复元素
                    const aiReplyElement = document.createElement('div');
                    aiReplyElement.className = 'flex items-start';
                    
                    // 根据用户消息生成AI回复内容
                    let aiReplyContent = '';
                    if (message.includes('工作时间') || message.includes('上班时间')) {
                        aiReplyContent = '我们的工作时间是早上8点到晚上8点，每周工作6天，周日休息。';
                    } else if (message.includes('薪资') || message.includes('工资') || message.includes('待遇')) {
                        aiReplyContent = '基本工资为4000元/月，加班费按照国家标准计算，综合下来月薪在6000-8000元之间，具体取决于加班时间。';
                    } else if (message.includes('面试') || message.includes('入职')) {
                        aiReplyContent = '您可以直接投递简历，我们HR会在24小时内联系您安排面试。面试通过后可以立即入职，需要携带身份证、学历证明和1寸照片。';
                    } else {
                        aiReplyContent = '感谢您的咨询。我们是富士康科技集团，作为全球领先的电子制造服务商，我们提供有竞争力的薪资和完善的福利体系。如果您有具体问题，请随时告诉我。';
                    }
                    
                    // 设置AI回复HTML
                    aiReplyElement.innerHTML = `
                        <div class="ai-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div>
                            <div class="message received">
                                ${aiReplyContent}
                                <div class="message-time">${timeString}</div>
                            </div>
                            <div class="quick-replies">
                                <div class="quick-reply">工作时间怎么安排？</div>
                                <div class="quick-reply">有什么福利？</div>
                                <div class="quick-reply">如何入职？</div>
                            </div>
                        </div>
                    `;
                    
                    // 添加到聊天容器
                    chatContainer.appendChild(aiReplyElement);
                    
                    // 为新添加的快速回复添加点击事件
                    const newQuickReplies = aiReplyElement.querySelectorAll('.quick-reply');
                    newQuickReplies.forEach(reply => {
                        reply.addEventListener('click', function() {
                            const replyMessage = this.textContent;
                            inputField.textContent = replyMessage;
                            sendMessage();
                        });
                    });
                    
                    // 滚动到底部
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 1000);
            }
        }
    }
}

// 初始化搜索页面功能
function initSearchPage() {
    // 搜索历史项点击事件
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            const searchText = this.querySelector('.history-text').textContent;
            document.querySelector('.search-input').value = searchText;
        });
    });
    
    // 热门搜索项点击事件
    const hotItems = document.querySelectorAll('.hot-item');
    hotItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.search-input').value = this.textContent;
        });
    });
    
    // 清除历史记录图标点击事件
    const clearIcons = document.querySelectorAll('.clear-icon');
    clearIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            this.closest('.history-item').remove();
        });
    });
    
    // 清空所有历史记录按钮点击事件
    const clearAllButton = document.querySelector('.text-gray-400');
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function() {
            const historyItems = document.querySelectorAll('.history-item');
            historyItems.forEach(item => item.remove());
        });
    }
    
    // 取消按钮点击事件
    const cancelButton = document.querySelector('.back-button');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            navigateTo('home.html');
        });
    }
}

// 初始化个人中心页面功能
function initProfilePage() {
    // 菜单项点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 如果有data-page属性，则导航到指定页面
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                navigateTo(targetPage);
            } else {
                alert('功能开发中，敬请期待！');
            }
        });
    });
}

// 初始化应聘进度页面功能
function initApplicationStatusPage() {
    // 标签页点击事件
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有活跃状态
            tabs.forEach(t => t.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
        });
    });
    
    // 查看详情按钮点击事件
    const detailButtons = document.querySelectorAll('button');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('查看详情功能开发中，敬请期待！');
        });
    });
}

// 初始化主页面功能
function initIndexPage() {
    // 默认加载首页
    const iframe = document.getElementById('content-frame');
    if (iframe && iframe.src === '') {
        iframe.src = 'home.html';
    }
}

// 页面导航函数
function navigateTo(page) {
    // 如果在iframe中，则通知父页面切换
    if (window.parent !== window) {
        window.parent.postMessage({
            action: 'navigate',
            page: page
        }, '*');
    } else {
        // 直接导航到目标页面
        window.location.href = page;
    }
}
