// job-data.js - 职位数据和公司信息

// 职位数据库
const jobsData = [
    {
        id: 1,
        title: "电子厂普工",
        company: "富士康科技集团",
        location: "深圳市龙华区",
        salary: "6000-8000元/月",
        tags: ["五险一金", "包吃包住", "有年终奖"],
        description: "负责电子产品组装、检测和包装工作，根据不同产线安排不同任务。",
        requirements: "年龄18-45周岁，身体健康，能适应倒班",
        benefits: "五险一金、免费住宿、餐补、节日福利、年终奖",
        shifts: "两班倒（白班8:00-20:00，夜班20:00-8:00）",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-08",
        hot: true
    },
    {
        id: 2,
        title: "仓库管理员",
        company: "京东物流",
        location: "广州市白云区",
        salary: "7000-9000元/月",
        tags: ["五险一金", "包住宿", "有补贴"],
        description: "负责仓库日常管理、货物出入库登记、库存盘点等工作。",
        requirements: "高中及以上学历，有仓储经验优先，熟悉电脑操作",
        benefits: "五险一金、带薪年假、节日福利、年终奖、定期体检",
        shifts: "早班8:00-17:00，晚班17:00-次日2:00",
        logo: "https://images.unsplash.com/photo-1605745341075-1b7460b99df8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-10",
        hot: true
    },
    {
        id: 3,
        title: "快递分拣员",
        company: "顺丰速运",
        location: "上海市青浦区",
        salary: "5500-7500元/月",
        tags: ["五险", "包吃住", "有提成"],
        description: "负责快递包裹分拣、扫描、装卸等工作，保证快递及时准确送达。",
        requirements: "初中及以上学历，能吃苦耐劳，适应快节奏工作",
        benefits: "五险、餐补、交通补贴、绩效奖金",
        shifts: "三班倒，每8小时一班",
        logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-09",
        hot: false
    },
    {
        id: 4,
        title: "服装厂缝纫工",
        company: "雅戈尔服饰",
        location: "宁波市北仑区",
        salary: "5000-8000元/月",
        tags: ["五险", "包住宿", "双休"],
        description: "负责服装缝纫、裁剪、整烫等工作，保证产品质量和生产进度。",
        requirements: "有缝纫经验优先，无经验可培训",
        benefits: "五险、带薪年假、节日福利、生日福利",
        shifts: "白班8:00-17:30，周末双休",
        logo: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-07",
        hot: false
    },
    {
        id: 5,
        title: "汽车制造工人",
        company: "上汽通用",
        location: "武汉市经济开发区",
        salary: "7500-10000元/月",
        tags: ["五险一金", "包吃住", "有年终奖"],
        description: "负责汽车零部件组装、检测、调试等工作，确保产品质量。",
        requirements: "高中及以上学历，有汽车制造经验优先",
        benefits: "五险一金、带薪年假、免费班车、定期体检、子女教育补贴",
        shifts: "两班倒，每班8小时",
        logo: "https://images.unsplash.com/photo-1581288694586-fcce6cc5f174?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-11",
        hot: true
    },
    {
        id: 6,
        title: "食品加工工人",
        company: "康师傅食品",
        location: "天津市西青区",
        salary: "5500-7000元/月",
        tags: ["五险", "包吃住", "有补贴"],
        description: "负责食品加工、包装、检验等工作，确保食品安全和质量。",
        requirements: "初中及以上学历，有健康证，能适应流水线工作",
        benefits: "五险、免费工作餐、节日福利、年终奖",
        shifts: "三班倒，每班8小时",
        logo: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-05",
        hot: false
    },
    {
        id: 7,
        title: "家电组装工",
        company: "海尔集团",
        location: "青岛市黄岛区",
        salary: "6000-8500元/月",
        tags: ["五险一金", "包住宿", "有年终奖"],
        description: "负责家电产品组装、调试、检测等工作，确保产品质量。",
        requirements: "初中及以上学历，有电子产品组装经验优先",
        benefits: "五险一金、带薪年假、免费班车、定期体检",
        shifts: "白班8:00-17:00，有需要时安排夜班",
        logo: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-06",
        hot: false
    },
    {
        id: 8,
        title: "电商客服",
        company: "阿里巴巴",
        location: "杭州市余杭区",
        salary: "6000-9000元/月",
        tags: ["五险一金", "双休", "有年终奖"],
        description: "负责线上客户咨询、订单处理、售后服务等工作，提供优质客户体验。",
        requirements: "大专及以上学历，普通话标准，打字速度快",
        benefits: "五险一金、带薪年假、节日福利、年终奖、定期团建",
        shifts: "早班9:00-18:00，晚班18:00-次日3:00",
        logo: "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-09",
        hot: true
    },
    {
        id: 9,
        title: "酒店服务员",
        company: "希尔顿酒店",
        location: "北京市朝阳区",
        salary: "5000-7000元/月",
        tags: ["五险", "包吃住", "有小费"],
        description: "负责客人接待、客房服务、餐饮服务等工作，提供优质服务体验。",
        requirements: "初中及以上学历，形象气质佳，有服务意识",
        benefits: "五险、免费食宿、带薪年假、节日福利、服务小费",
        shifts: "三班倒，每班8小时",
        logo: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-08",
        hot: false
    },
    {
        id: 10,
        title: "安保人员",
        company: "中安保安服务",
        location: "重庆市渝北区",
        salary: "5500-7000元/月",
        tags: ["五险", "包住宿", "有补贴"],
        description: "负责园区安全巡逻、门岗值守、秩序维护等工作，保障园区安全。",
        requirements: "初中及以上学历，身高170cm以上，退伍军人优先",
        benefits: "五险、免费住宿、餐补、节日福利",
        shifts: "三班倒，每班8小时",
        logo: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-07",
        hot: false
    },
    {
        id: 11,
        title: "超市理货员",
        company: "沃尔玛超市",
        location: "成都市锦江区",
        salary: "4500-6000元/月",
        tags: ["五险", "双休", "有补贴"],
        description: "负责商品上架、整理、盘点等工作，保持货架整洁有序。",
        requirements: "初中及以上学历，能吃苦耐劳，有零售经验优先",
        benefits: "五险、员工折扣、节日福利、绩效奖金",
        shifts: "早班7:00-16:00，晚班13:00-22:00",
        logo: "https://images.unsplash.com/photo-1580913428023-02c695666d61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-10",
        hot: false
    },
    {
        id: 12,
        title: "建筑工人",
        company: "中建三局",
        location: "深圳市南山区",
        salary: "8000-12000元/月",
        tags: ["五险", "包吃住", "高薪"],
        description: "负责建筑施工、装修、材料搬运等工作，确保工程质量和进度。",
        requirements: "身体健康，能吃苦耐劳，有建筑工作经验优先",
        benefits: "五险、免费食宿、高温补贴、节日福利",
        shifts: "白班7:00-18:00，单休",
        logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-09",
        hot: true
    }
];

// 公司数据库
const companiesData = [
    {
        id: 1,
        name: "富士康科技集团",
        industry: "电子制造",
        size: "10万人以上",
        founded: "1974年",
        description: "全球最大的电子产品代工企业，为苹果、华为等知名品牌提供代工服务。",
        benefits: "五险一金、免费住宿、餐补、节日福利、年终奖",
        culture: "注重效率和质量，工作节奏快，管理规范。",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 2,
        name: "京东物流",
        industry: "物流仓储",
        size: "5万-10万人",
        founded: "2007年",
        description: "中国领先的供应链物流服务商，拥有全国性的仓储和配送网络。",
        benefits: "五险一金、带薪年假、节日福利、年终奖、定期体检",
        culture: "追求效率和服务质量，注重团队协作和创新。",
        logo: "https://images.unsplash.com/photo-1605745341075-1b7460b99df8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 3,
        name: "顺丰速运",
        industry: "快递物流",
        size: "5万-10万人",
        founded: "1993年",
        description: "中国领先的综合物流服务商，以快递业务为核心。",
        benefits: "五险、餐补、交通补贴、绩效奖金",
        culture: "速度至上，服务第一，注重执行力和责任心。",
        logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 4,
        name: "雅戈尔服饰",
        industry: "服装制造",
        size: "1万-5万人",
        founded: "1979年",
        description: "中国知名服装品牌，专注于中高端男装和女装的设计、生产和销售。",
        benefits: "五险、带薪年假、节日福利、生日福利",
        culture: "注重品质和创新，追求卓越，关注员工发展。",
        logo: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 5,
        name: "上汽通用",
        industry: "汽车制造",
        size: "5万-10万人",
        founded: "1997年",
        description: "中国领先的汽车制造商，是上海汽车集团和通用汽车的合资企业。",
        benefits: "五险一金、带薪年假、免费班车、定期体检、子女教育补贴",
        culture: "追求卓越品质，注重创新和团队合作，关注员工成长。",
        logo: "https://images.unsplash.com/photo-1581288694586-fcce6cc5f174?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 6,
        name: "康师傅食品",
        industry: "食品制造",
        size: "1万-5万人",
        founded: "1992年",
        description: "亚洲知名食品饮料制造商，主要生产方便面、饮料和糕点等产品。",
        benefits: "五险、免费工作餐、节日福利、年终奖",
        culture: "注重食品安全和质量，追求创新和效率，关注员工福祉。",
        logo: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 7,
        name: "海尔集团",
        industry: "家电制造",
        size: "5万-10万人",
        founded: "1984年",
        description: "全球领先的家电制造商，产品涵盖冰箱、洗衣机、空调等多个品类。",
        benefits: "五险一金、带薪年假、免费班车、定期体检",
        culture: "以用户为中心，注重创新和品质，鼓励员工自主创业。",
        logo: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 8,
        name: "阿里巴巴",
        industry: "互联网",
        size: "5万-10万人",
        founded: "1999年",
        description: "全球领先的电子商务和云计算公司，拥有淘宝、天猫等知名平台。",
        benefits: "五险一金、带薪年假、节日福利、年终奖、定期团建",
        culture: "客户第一，团队合作，拥抱变化，诚信，激情和梦想。",
        logo: "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
];

// 应用状态数据
const applicationStatusData = [
    {
        id: 1,
        jobTitle: "电子厂普工",
        company: "富士康科技集团",
        applyDate: "2025-03-08",
        status: "面试通过",
        nextStep: "等待入职",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 2,
        jobTitle: "仓库管理员",
        company: "京东物流",
        applyDate: "2025-03-10",
        status: "简历筛选",
        nextStep: "等待面试通知",
        logo: "https://images.unsplash.com/photo-1605745341075-1b7460b99df8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 3,
        jobTitle: "汽车制造工人",
        company: "上汽通用",
        applyDate: "2025-03-11",
        status: "待面试",
        nextStep: "2025-03-15 10:00面试",
        logo: "https://images.unsplash.com/photo-1581288694586-fcce6cc5f174?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 4,
        jobTitle: "电商客服",
        company: "阿里巴巴",
        applyDate: "2025-03-09",
        status: "不合适",
        nextStep: "查看相似职位",
        logo: "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 5,
        jobTitle: "建筑工人",
        company: "中建三局",
        applyDate: "2025-03-09",
        status: "已投递",
        nextStep: "等待简历筛选",
        logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
];

// 热门搜索数据
const hotSearchData = [
    "普工",
    "包吃住",
    "高薪",
    "双休",
    "五险一金",
    "无经验要求",
    "日结",
    "电子厂"
];

// 搜索历史数据
const searchHistoryData = [
    "普工",
    "深圳",
    "服装厂",
    "包吃住"
];

// 将数据暴露给全局作用域
window.jobsData = jobsData;
window.companiesData = companiesData;
window.applicationStatusData = applicationStatusData;
window.hotSearchData = hotSearchData;
window.searchHistoryData = searchHistoryData;
