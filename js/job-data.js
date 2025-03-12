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
    },
    {
        id: 13,
        title: "餐厅服务员",
        company: "海底捞火锅",
        location: "广州市天河区",
        salary: "5500-8000元/月",
        tags: ["五险", "包吃住", "高提成"],
        description: "负责顾客接待、点餐、上菜、结账等服务工作，提供优质用餐体验。",
        requirements: "初中及以上学历，形象气质佳，有服务意识，能吃苦耐劳",
        benefits: "五险、免费食宿、绩效奖金、服务费分成、节日福利",
        shifts: "两班倒，每班10小时",
        logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-12",
        hot: true
    },
    {
        id: 14,
        title: "快递员",
        company: "中通快递",
        location: "南京市江宁区",
        salary: "6000-10000元/月",
        tags: ["提成高", "自由时间", "有补贴"],
        description: "负责快递包裹的派送和揽收工作，维护客户关系，拓展业务。",
        requirements: "初中及以上学历，熟悉当地路况，有C1驾照优先",
        benefits: "提成分成、话补、油补、节日福利",
        shifts: "早8:00-晚6:00，自由安排",
        logo: "https://images.unsplash.com/photo-1586528116493-ce4c5d29dfa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-11",
        hot: true
    },
    {
        id: 15,
        title: "电焊工",
        company: "中船重工",
        location: "上海市浦东新区",
        salary: "8000-12000元/月",
        tags: ["五险一金", "包吃住", "技术工种"],
        description: "负责金属构件的焊接、切割、打磨等工作，确保焊接质量和安全。",
        requirements: "有电焊工证，2年以上工作经验，能吃苦耐劳",
        benefits: "五险一金、免费食宿、高温补贴、技能津贴、节日福利",
        shifts: "白班8:00-17:30，加班有加班费",
        logo: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-10",
        hot: false
    },
    {
        id: 16,
        title: "美容美发学徒",
        company: "沙宣美发",
        location: "深圳市福田区",
        salary: "4000-6000元/月",
        tags: ["包吃住", "有提成", "可学技术"],
        description: "学习美发、美容技术，协助发型师工作，提供基础服务。",
        requirements: "初中及以上学历，形象气质佳，有学习意愿，能吃苦耐劳",
        benefits: "免费食宿、技能培训、晋升空间、节日福利",
        shifts: "早10:00-晚8:00，排班制",
        logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-08",
        hot: false
    },
    {
        id: 17,
        title: "汽车维修工",
        company: "一汽大众4S店",
        location: "北京市海淀区",
        salary: "7000-12000元/月",
        tags: ["五险一金", "有补贴", "技术工种"],
        description: "负责汽车故障诊断、维修、保养等工作，确保维修质量。",
        requirements: "汽修相关专业毕业，有汽车维修经验，持有相关证书优先",
        benefits: "五险一金、技能培训、绩效奖金、节日福利",
        shifts: "早8:30-晚5:30，单休",
        logo: "https://images.unsplash.com/photo-1530046339160-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-09",
        hot: false
    },
    {
        id: 18,
        title: "保洁员",
        company: "万科物业",
        location: "杭州市西湖区",
        salary: "3500-4500元/月",
        tags: ["五险", "双休", "轻松"],
        description: "负责小区公共区域的清洁、保洁工作，维护小区环境整洁。",
        requirements: "身体健康，能吃苦耐劳，有责任心",
        benefits: "五险、节日福利、带薪年假、绩效奖金",
        shifts: "早7:00-晚4:00，双休",
        logo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-07",
        hot: false
    },
    {
        id: 19,
        title: "幼儿园保育员",
        company: "红黄蓝幼儿园",
        location: "成都市武侯区",
        salary: "4000-6000元/月",
        tags: ["五险", "双休", "有补贴"],
        description: "协助老师照顾幼儿生活起居，维护教室卫生，准备教具等。",
        requirements: "高中及以上学历，有爱心耐心，喜欢小朋友",
        benefits: "五险、带薪年假、节日福利、绩效奖金",
        shifts: "早7:30-晚5:30，双休",
        logo: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-11",
        hot: false
    },
    {
        id: 20,
        title: "厨师",
        company: "喜来登酒店",
        location: "上海市静安区",
        salary: "8000-15000元/月",
        tags: ["五险一金", "包吃住", "有补贴"],
        description: "负责菜品制作、厨房管理、食材采购等工作，确保出品质量。",
        requirements: "中专及以上学历，有厨师证，3年以上工作经验",
        benefits: "五险一金、免费食宿、带薪年假、节日福利、绩效奖金",
        shifts: "早9:00-晚9:00，排班制",
        logo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-12",
        hot: true
    },
    {
        id: 21,
        title: "农场工人",
        company: "绿色农场",
        location: "郑州市郊区",
        salary: "4500-6000元/月",
        tags: ["包吃住", "环境好", "有补贴"],
        description: "负责农作物种植、养护、收获等工作，确保农产品质量。",
        requirements: "身体健康，能吃苦耐劳，有农业经验优先",
        benefits: "免费食宿、绩效奖金、节日福利",
        shifts: "早6:00-晚5:00，月休4天",
        logo: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-06",
        hot: false
    },
    {
        id: 22,
        title: "销售代表",
        company: "中国平安",
        location: "广州市天河区",
        salary: "5000-20000元/月",
        tags: ["五险一金", "高提成", "有补贴"],
        description: "负责保险产品销售、客户开发、售后服务等工作，完成销售目标。",
        requirements: "高中及以上学历，有良好的沟通能力，有销售经验优先",
        benefits: "五险一金、高额提成、带薪培训、晋升空间",
        shifts: "早9:00-晚6:00，单休",
        logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-10",
        hot: true
    },
    {
        id: 23,
        title: "装卸工",
        company: "中铁物流",
        location: "武汉市汉阳区",
        salary: "5500-7500元/月",
        tags: ["五险", "包吃住", "有补贴"],
        description: "负责货物装卸、搬运、码垛等工作，确保货物安全完整。",
        requirements: "身体健康，能吃苦耐劳，有搬运装卸经验优先",
        benefits: "五险、免费食宿、高温补贴、节日福利",
        shifts: "两班倒，每班8小时",
        logo: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-08",
        hot: false
    },
    {
        id: 24,
        title: "收银员",
        company: "永辉超市",
        location: "重庆市江北区",
        salary: "4000-5500元/月",
        tags: ["五险", "双休", "有补贴"],
        description: "负责商品结算、收银、整理账目等工作，提供良好的顾客服务。",
        requirements: "高中及以上学历，形象气质佳，有收银经验优先",
        benefits: "五险、带薪年假、员工折扣、节日福利",
        shifts: "早8:00-晚5:00，晚5:00-凌晨12:00，排班制",
        logo: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        publishDate: "2025-03-09",
        hot: false
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
    },
    {
        id: 9,
        name: "希尔顿酒店",
        industry: "酒店服务",
        size: "1万-5万人",
        founded: "1919年",
        description: "全球知名的酒店集团，提供高品质的住宿和餐饮服务。",
        benefits: "五险、免费食宿、带薪年假、节日福利、服务小费",
        culture: "以客户为中心，追求卓越服务，注重细节和品质。",
        logo: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 10,
        name: "中安保安服务",
        industry: "安保服务",
        size: "5000-1万人",
        founded: "2000年",
        description: "专业的安保服务提供商，为企业、园区和社区提供安全保障。",
        benefits: "五险、免费住宿、餐补、节日福利",
        culture: "纪律严明，责任至上，团队协作，专业服务。",
        logo: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
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
