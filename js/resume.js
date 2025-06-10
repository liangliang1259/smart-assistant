// 文件上传处理
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 检查文件类型
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        alert('请上传PDF或Word格式的文件');
        return;
    }

    // 创建FormData对象
    const formData = new FormData();
    formData.append('resume', file);

    // 显示上传中状态
    const uploadButton = document.querySelector('#uploadButton');
    const originalText = uploadButton.textContent;
    uploadButton.textContent = '上传中...';
    uploadButton.disabled = true;

    // 发送到服务器
    fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 上传成功，更新UI
            document.querySelector('#uploadStatus').textContent = '上传成功';
            // 更新简历评分和建议
            updateResumeScore(data.score);
            updateResumeSuggestions(data.suggestions);
            // 跳转到编辑页面
            setTimeout(() => {
                window.location.href = 'resume-edit.html';
            }, 1000);
        } else {
            throw new Error(data.message || '上传失败');
        }
    })
    .catch(error => {
        alert('上传失败：' + error.message);
    })
    .finally(() => {
        // 恢复按钮状态
        uploadButton.textContent = originalText;
        uploadButton.disabled = false;
    });
}

// 更新简历评分
function updateResumeScore(score) {
    const scoreElements = {
        total: document.querySelector('#totalScore'),
        content: document.querySelector('#contentScore'),
        professional: document.querySelector('#professionalScore'),
        keyword: document.querySelector('#keywordScore')
    };

    // 更新分数显示
    scoreElements.total.textContent = score.total;
    scoreElements.content.textContent = score.content + '%';
    scoreElements.professional.textContent = score.professional + '%';
    scoreElements.keyword.textContent = score.keyword + '%';

    // 更新进度条
    document.querySelector('#contentProgress').style.width = score.content + '%';
    document.querySelector('#professionalProgress').style.width = score.professional + '%';
    document.querySelector('#keywordProgress').style.width = score.keyword + '%';
}

// 更新简历建议
function updateResumeSuggestions(suggestions) {
    const suggestionsContainer = document.querySelector('#suggestionsContainer');
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="bg-white p-4 rounded-lg">
            <div class="flex items-start">
                <div class="w-8 h-8 bg-${suggestion.type}-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg class="w-4 h-4 text-${suggestion.type}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${suggestion.icon}"></path>
                    </svg>
                </div>
                <div>
                    <h4 class="font-medium text-gray-800 mb-1">${suggestion.title}</h4>
                    <p class="text-gray-600 text-sm">${suggestion.content}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// 导出PDF
function exportPDF() {
    const button = document.querySelector('#exportButton');
    const originalText = button.textContent;
    button.textContent = '导出中...';
    button.disabled = true;

    // 获取简历内容
    fetch('/api/resume/export', {
        method: 'GET',
        headers: {
            'Accept': 'application/pdf'
        }
    })
    .then(response => response.blob())
    .then(blob => {
        // 创建下载链接
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '我的简历.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
    .catch(error => {
        alert('导出失败：' + error.message);
    })
    .finally(() => {
        button.textContent = originalText;
        button.disabled = false;
    });
}

// 保存简历
function saveResume() {
    const button = document.querySelector('#saveButton');
    const originalText = button.textContent;
    button.textContent = '保存中...';
    button.disabled = true;

    // 收集表单数据
    const formData = {
        basicInfo: {
            name: document.querySelector('#name').value,
            position: document.querySelector('#position').value,
            experience: document.querySelector('#experience').value,
            salary: document.querySelector('#salary').value
        },
        skills: Array.from(document.querySelectorAll('.skill-item')).map(item => ({
            name: item.querySelector('.skill-name').value,
            description: item.querySelector('.skill-description').value
        })),
        workExperience: Array.from(document.querySelectorAll('.work-item')).map(item => ({
            company: item.querySelector('.company-name').value,
            position: item.querySelector('.position-name').value,
            period: item.querySelector('.work-period').value,
            description: item.querySelector('.work-description').value
        })),
        projects: Array.from(document.querySelectorAll('.project-item')).map(item => ({
            name: item.querySelector('.project-name').value,
            role: item.querySelector('.project-role').value,
            period: item.querySelector('.project-period').value,
            description: item.querySelector('.project-description').value
        })),
        education: Array.from(document.querySelectorAll('.education-item')).map(item => ({
            school: item.querySelector('.school-name').value,
            major: item.querySelector('.major-name').value,
            period: item.querySelector('.education-period').value,
            degree: item.querySelector('.degree').value
        }))
    };

    // 发送到服务器
    fetch('/api/resume/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('保存成功');
            window.location.href = 'resume-preview.html';
        } else {
            throw new Error(data.message || '保存失败');
        }
    })
    .catch(error => {
        alert('保存失败：' + error.message);
    })
    .finally(() => {
        button.textContent = originalText;
        button.disabled = false;
    });
}

// 添加技能项
function addSkillItem() {
    const container = document.querySelector('#skillsContainer');
    const template = document.querySelector('#skillTemplate');
    const newItem = template.content.cloneNode(true);
    container.appendChild(newItem);
}

// 添加工作经历
function addWorkItem() {
    const container = document.querySelector('#workContainer');
    const template = document.querySelector('#workTemplate');
    const newItem = template.content.cloneNode(true);
    container.appendChild(newItem);
}

// 添加项目经验
function addProjectItem() {
    const container = document.querySelector('#projectContainer');
    const template = document.querySelector('#projectTemplate');
    const newItem = template.content.cloneNode(true);
    container.appendChild(newItem);
}

// 添加教育经历
function addEducationItem() {
    const container = document.querySelector('#educationContainer');
    const template = document.querySelector('#educationTemplate');
    const newItem = template.content.cloneNode(true);
    container.appendChild(newItem);
}

// 删除项目
function deleteItem(button) {
    const item = button.closest('.item');
    item.remove();
}

// 页面导航
function initNavigation() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    
    // 更新导航项的激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.endsWith(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 页面加载完成后初始化导航
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
}); 