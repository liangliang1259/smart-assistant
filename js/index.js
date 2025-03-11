// index.js - 主应用入口文件，处理iframe和页面加载

document.addEventListener('DOMContentLoaded', function() {
    // 获取主内容iframe
    const contentFrame = document.getElementById('content-frame');
    
    // 如果找到iframe并且没有设置src，则加载首页
    if (contentFrame && (!contentFrame.src || contentFrame.src === '')) {
        contentFrame.src = 'home.html';
    }
    
    // 初始化底部导航栏
    initBottomNav();
    
    // 监听来自iframe的消息
    window.addEventListener('message', function(event) {
        if (event.data && event.data.action === 'navigate') {
            // 更新iframe的src
            if (contentFrame) {
                contentFrame.src = event.data.page;
            }
            
            // 更新底部导航栏的活跃状态
            updateActiveNavItem(event.data.page);
        }
    });
});

// 初始化底部导航栏
function initBottomNav() {
    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');
    
    // 为每个导航项添加点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取目标页面
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                // 获取iframe并更新src
                const contentFrame = document.getElementById('content-frame');
                if (contentFrame) {
                    contentFrame.src = targetPage;
                }
                
                // 更新导航栏活跃状态
                updateActiveNavItem(targetPage);
            }
        });
    });
    
    // 默认激活首页导航项
    updateActiveNavItem('home.html');
}

// 更新导航栏活跃状态
function updateActiveNavItem(page) {
    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');
    
    // 移除所有活跃状态
    navItems.forEach(item => {
        item.classList.remove('active');
        
        // 重置图标颜色
        const icon = item.querySelector('i');
        if (icon) {
            icon.style.color = '#999';
        }
    });
    
    // 为当前页面添加活跃状态
    const activeItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        
        // 更新图标颜色
        const icon = activeItem.querySelector('i');
        if (icon) {
            icon.style.color = '#3b82f6';
        }
    }
}

// 更新状态栏时间
function updateStatusBarTime() {
    const statusTimeElements = document.querySelectorAll('.status-time');
    
    statusTimeElements.forEach(element => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        element.textContent = `${hours}:${minutes}`;
    });
}

// 初始化时更新一次时间
updateStatusBarTime();

// 每分钟更新一次时间
setInterval(updateStatusBarTime, 60000);
