// 数据新闻页面交互脚本
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有功能
    initializeCharts();
    initializeNavigation();
    initializeScrollEffects();
    initializeBackToTop();
    initializeLoading();

    console.log('彩礼纠纷图鉴页面已加载完成');
});

// 在文件顶部添加移动端检测函数
function isMobile() {
    return window.innerWidth <= 768;
}

// 图表初始化
function initializeCharts() {
    // 案件数量变化折线图
    initCaseTrendChart();

    // 公众感知饼图
    initExperiencePieChart();

    // 彩礼纠纷解决方式漏斗图
    initResolutionMethodsChart();

    // 中国地图
    initChinaMapChart();

    // 法庭情景条形图
    initSceneBarChart();

    // 彩礼范围认知雷达图
    initPerceptionRadarChart();

    // 性别认知差异图
    initGenderPerceptionChart();

    // 性别比例图
    initGenderRatioChart();

    // 彩礼金额主导方饼图
    initDowryDecisionChart();

    // 彩礼象征代际差异图
    initGenerationalDifferencesChart();

    // 彩礼金额对比图
    initAmountComparisonChart();

    // 词云图
    initWordCloudChart();

    // 填充数据表格
    populateDataTables();
}

// 1. 案件数量变化折线图 - 添加移动端优化
function initCaseTrendChart() {
    const chart = echarts.init(document.getElementById('caseTrendChart'));

    // 移动端适配配置
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '2020-2025年彩礼纠纷案件数量变化',
            left: 'center',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            },
            top: isMobileDevice ? '5%' : '3%'
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#c41e3a',
            textStyle: {
                color: '#2c1810'
            }
        },
        grid: {
            left: isMobileDevice ? '8%' : '5%',
            right: isMobileDevice ? '8%' : '5%',
            bottom: isMobileDevice ? '15%' : '10%',
            top: isMobileDevice ? '18%' : '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2020年', '2021年', '2022年', '2023年', '2024年', '2025年'],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 12,
                rotate: isMobileDevice ? 45 : 0
            }
        },
        yAxis: {
            type: 'value',
            name: '案件数量',
            nameTextStyle: {
                fontSize: isMobileDevice ? 11 : 12
            },
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.1)'
                }
            }
        },
        series: [{
            name: '案件数量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: isMobileDevice ? 6 : 8,
            lineStyle: {
                color: '#c41e3a',
                width: 3
            },
            itemStyle: {
                color: '#c41e3a'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(196, 30, 58, 0.3)'
                    }, {
                        offset: 1, color: 'rgba(196, 30, 58, 0.05)'
                    }]
                }
            },
            data: [4250, 10234, 6405, 4962, 5085, 4501]
        }]
    };
    chart.setOption(option);
}

// 2. 公众感知饼图 - 添加移动端优化
function initExperiencePieChart() {
    const chart = echarts.init(document.getElementById('experiencePieChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '公众对彩礼纠纷的直接感知',
            left: 'center',
            top: isMobileDevice ? '3%' : '10',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: isMobileDevice ? 'horizontal' : 'vertical',
            left: isMobileDevice ? 'center' : 'left',
            top: isMobileDevice ? '18%' : 'center',
            bottom: isMobileDevice ? '10%' : 'auto',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            },
            itemWidth: 12,
            itemHeight: 12,
            itemGap: isMobileDevice ? 8 : 20
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: isMobileDevice ? '25%' : '15%',
            containLabel: true
        },
        series: [{
            name: '感知比例',
            type: 'pie',
            radius: isMobileDevice ? ['30%', '50%'] : ['35%', '65%'],
            center: isMobileDevice ? ['50%', '45%'] : ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
                fontSize: isMobileDevice ? 12 : 14,
                formatter: '{b}: {c}%'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: isMobileDevice ? 11 : '12',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 5.28, name: '亲身经历过', itemStyle: { color: '#c41e3a' } },
                { value: 12.45, name: '了解过相关案例', itemStyle: { color: '#d4380d' } },
                { value: 32.12, name: '从媒体报道了解', itemStyle: { color: '#d4af37' } },
                { value: 48.96, name: '从未了解过', itemStyle: { color: '#f0c674' } },
                { value: 1.19, name: '其他', itemStyle: { color: '#8c6239' } }
            ]
        }]
    };
    chart.setOption(option);
}

// 2.5 彩礼纠纷解决方式漏斗图 - 添加移动端优化
function initResolutionMethodsChart() {
    const chart = echarts.init(document.getElementById('resolutionMethodsChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '彩礼纠纷常见解决方式',
            left: 'center',
            top: isMobileDevice ? '5%' : '3%',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}%'
        },
        series: [{
            name: '解决方式',
            type: 'funnel',
            left: '10%',
            top: isMobileDevice ? '20%' : '15%',
            bottom: '10%',
            width: '80%',
            min: 0,
            max: 60,
            minSize: isMobileDevice ? '10%' : '15%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside',
                color: '#fff',
                fontSize: isMobileDevice ? 11 : 12,
                fontWeight: 'bold',
                formatter: '{b}: {c}%'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: isMobileDevice ? 12 : 14,
                    fontWeight: 'bold'
                }
            },
            data: [
                { value: 56.37, name: '两家人私下协商', itemStyle: { color: '#d4af37' } },
                { value: 31.91, name: '法律诉讼', itemStyle: { color: '#c41e3a' } },
                { value: 6.43, name: '找媒人或亲友帮忙调解', itemStyle: { color: '#d4af37' } },
                { value: 5.30, name: '找村委会/居委会调解', itemStyle: { color: '#d4af37' } }
            ]
        }]
    };
    chart.setOption(option);
}

// 3. 中国地图 - 添加移动端优化
function initChinaMapChart() {
    const chart = echarts.init(document.getElementById('chinaMapChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '各地区彩礼纠纷案件分布 (2020-2025年)',
            left: 'center',
            top: isMobileDevice ? '3%' : '10',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>累计案件: {c}'
        },
        visualMap: {
            min: 0,
            max: 7500,
            left: isMobileDevice ? '5%' : 'left',
            top: isMobileDevice ? '10%' : 'middle',
            orient: isMobileDevice ? 'horizontal' : 'vertical',
            text: ['高', '低'],
            calculable: true,
            inRange: {
                color: ['#e6f7ff', '#bae7ff', '#40a9ff', '#1890ff']
            },
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 12
            },
            itemWidth: isMobileDevice ? 100 : 15,
            itemHeight: isMobileDevice ? 15 : 100
        },
        series: [{
            name: '彩礼纠纷案件',
            type: 'map',
            map: 'china',
            roam: false,
            zoom: isMobileDevice ? 1 : 1.2,
            center: [105, 35],
            top: isMobileDevice ? '15%' : '10%',
            data: [
                { name: '河南', value: 7320 },
                { name: '山东', value: 4850 },
                { name: '安徽', value: 4230 },
                { name: '江苏', value: 3980 },
                { name: '河北', value: 3650 },
                { name: '山西', value: 2980 },
                { name: '湖北', value: 2850 },
                { name: '湖南', value: 2680 },
                { name: '江西', value: 2450 },
                { name: '陕西', value: 2150 },
                { name: '广西', value: 1890 },
                { name: '浙江', value: 1780 },
                { name: '广东', value: 1650 },
                { name: '四川', value: 1520 },
                { name: '贵州', value: 1420 },
                { name: '云南', value: 1380 },
                { name: '福建', value: 1250 },
                { name: '辽宁', value: 1180 },
                { name: '吉林', value: 1120 },
                { name: '黑龙江', value: 1080 },
                { name: '内蒙古', value: 950 },
                { name: '重庆', value: 890 },
                { name: '宁夏', value: 720 },
                { name: '甘肃', value: 680 },
                { name: '青海', value: 450 },
                { name: '新疆', value: 380 },
                { name: '西藏', value: 120 },
                { name: '海南', value: 90 }
            ]
        }]
    };
    chart.setOption(option);

    // 填充排名表格
    const topRegionsTable = document.getElementById('topRegionsTable');
    const topRegions = [
        { rank: 1, name: '河南', count: 7320 },
        { rank: 2, name: '山东', count: 4850 },
        { rank: 3, name: '安徽', count: 4230 },
        { rank: 4, name: '江苏', count: 3980 },
        { rank: 5, name: '河北', count: 3650 },
        { rank: 6, name: '山西', count: 2980 },
        { rank: 7, name: '湖北', count: 2850 },
        { rank: 8, name: '湖南', count: 2680 },
        { rank: 9, name: '江西', count: 2450 },
        { rank: 10, name: '陕西', count: 2150 }
    ];

    topRegions.forEach(region => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${region.rank}</td>
            <td>${region.name}</td>
            <td>${region.count.toLocaleString()}</td>
        `;
        topRegionsTable.appendChild(row);
    });
}

// 9. 场景条形图 - 添加移动端优化
function initSceneBarChart() {
    const chart = echarts.init(document.getElementById('sceneBarChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '2025年彩礼纠纷法庭情景分类统计',
            left: 'center',
            top: isMobileDevice ? '5%' : '3%',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: isMobileDevice ? '15%' : '5%',
            right: isMobileDevice ? '5%' : '5%',
            bottom: isMobileDevice ? '15%' : '10%',
            top: isMobileDevice ? '20%' : '15%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.1)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['男方家庭困难', '婚托婚骗', '过错争议', '未登记/短婚闪离', '彩礼范围争议'],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            }
        },
        series: [{
            name: '案件数量',
            type: 'bar',
            data: [12, 16, 48, 134, 227],
            itemStyle: {
                color: function(params) {
                    // 使用黄色渐变，从深黄到浅黄
                    const colors = ['#d4af37', '#d4af37', '#d4af37', '#d4af37', '#d4af37'];
                    return {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: colors[params.dataIndex] || '#d4af37'
                        }, {
                            offset: 1, color: '#f9e4c4'
                        }]
                    };
                },
                borderRadius: [0, 4, 4, 0]
            },
            label: {
                show: true,
                position: 'right',
                color: '#2c1810',
                fontWeight: 'bold',
                fontSize: isMobileDevice ? 10 : 11
            }
        }]
    };
    chart.setOption(option);
}

// 4. 雷达图 - 添加移动端优化
function initPerceptionRadarChart() {
    const chart = echarts.init(document.getElementById('perceptionRadarChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '公众对彩礼范围的认知程度',
            left: 'center',
            top: isMobileDevice ? '3%' : '10',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {},
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: isMobileDevice ? '20%' : '15%',
            containLabel: true
        },
        radar: {
            indicator: [
                { name: '男方直接给女方家庭的现金', max: 100 },
                { name: '三金/五金(金项链、戒指等)', max: 100 },
                { name: '恋爱时的大额礼物(如名贵首饰)', max: 100 },
                { name: '改口费、压箱钱', max: 100 },
                { name: '汽车、房产(或首付)', max: 100 },
                { name: '婚礼红包/礼金', max: 100 },
                { name: '不确定', max: 100 }
            ],
            center: ['50%', isMobileDevice ? '55%' : '60%'],
            radius: isMobileDevice ? '60%' : '70%',
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.2)'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(196, 30, 58, 0.05)', 'rgba(212, 175, 55, 0.05)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            name: {
                textStyle: {
                    color: '#2c1810',
                    fontSize: isMobileDevice ? 10 : 11
                }
            }
        },
        series: [{
            name: '认知程度',
            type: 'radar',
            data: [{
                value: [80, 70, 49, 40, 38, 15, 10],
                name: '认为是彩礼的比例',
                areaStyle: {
                    color: 'rgba(196, 30, 58, 0.3)'
                },
                lineStyle: {
                    color: '#c41e3a',
                    width: 2
                },
                itemStyle: {
                    color: '#c41e3a'
                }
            }]
        }]
    };
    chart.setOption(option);
}

// 5. 性别认知差异图 - 添加移动端优化
function initGenderPerceptionChart() {
    const chart = echarts.init(document.getElementById('genderPerceptionChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '男女对"何为彩礼"的认同度对比',
            left: 'center',
            top: isMobileDevice ? '3%' : '10',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['女性认知', '男性认知'],
            top: isMobileDevice ? '15%' : '35',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            },
            itemWidth: isMobileDevice ? 12 : 16,
            itemHeight: isMobileDevice ? 12 : 16
        },
        grid: {
            left: isMobileDevice ? '12%' : '8%',
            right: isMobileDevice ? '12%' : '8%',
            bottom: isMobileDevice ? '35%' : '25%',
            top: isMobileDevice ? '25%' : '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [
                '给女方家庭的现金',
                '三金/五金',
                '汽车、房产',
                '改口费、压箱钱',
                '婚礼红包/礼金',
                '恋爱时的大额礼物',
                '不确定'
            ],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                rotate: isMobileDevice ? 45 : 0,
                fontSize: isMobileDevice ? 9 : 11,
                interval: 0,
                formatter: function(value) {
                    // 移动端截断过长的文本
                    if (isMobileDevice) {
                        const maxLength = 8;
                        if (value.length > maxLength) {
                            return value.substring(0, maxLength) + '...';
                        }
                    }
                    return value;
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '认知比例 (%)',
            nameTextStyle: {
                fontSize: isMobileDevice ? 11 : 12
            },
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.1)'
                }
            }
        },
        series: [{
            name: '女性认知',
            type: 'bar',
            barWidth: isMobileDevice ? '35%' : '40%',
            data: [80, 71, 52, 42, 41, 12, 8],
            itemStyle: {
                color: '#d4380d'
            },
            label: {
                show: !isMobileDevice,
                position: 'top',
                color: '#2c1810',
                fontSize: 11,
                formatter: '{c}%'
            }
        }, {
            name: '男性认知',
            type: 'bar',
            barWidth: isMobileDevice ? '35%' : '40%',
            data: [74, 63, 42, 39, 42, 14, 11],
            itemStyle: {
                color: '#1890ff'
            },
            label: {
                show: !isMobileDevice,
                position: 'top',
                color: '#2c1810',
                fontSize: 11,
                formatter: '{c}%'
            }
        }]
    };
    chart.setOption(option);
}

// 6. 性别比例图 - 添加移动端优化
function initGenderRatioChart() {
    const chart = echarts.init(document.getElementById('genderRatioChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '2024年适婚男女人口性别比',
            left: 'center',
            top: isMobileDevice ? '3%' : '10',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['性别比'],
            top: isMobileDevice ? '15%' : '35',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            }
        },
        grid: {
            left: isMobileDevice ? '12%' : '8%',
            right: isMobileDevice ? '12%' : '8%',
            bottom: isMobileDevice ? '20%' : '15%',
            top: isMobileDevice ? '25%' : '25%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['35-39岁', '30-34岁', '25-29岁', '20-24岁', '平均'],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11,
                rotate: isMobileDevice ? 45 : 0
            }
        },
        yAxis: {
            type: 'value',
            name: '性别比 (女=100)',
            nameTextStyle: {
                fontSize: isMobileDevice ? 11 : 12
            },
            min: 100,
            max: 120,
            interval: 5,
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.1)'
                }
            }
        },
        series: [{
            name: '性别比',
            type: 'bar',
            barWidth: isMobileDevice ? '50%' : '60%',
            data: [105.44, 109.43, 112.74, 113.98, 110.40],
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#c41e3a' },
                    { offset: 1, color: '#d4380d' }
                ]),
                borderRadius: [4, 4, 0, 0]
            },
            label: {
                show: !isMobileDevice,
                position: 'top',
                color: '#2c1810',
                fontSize: 12,
                fontWeight: 'bold',
                formatter: '{c}'
            },
            markLine: {
                data: [{
                    yAxis: 110.40,
                    lineStyle: {
                        color: '#d4af37',
                        type: 'dashed',
                        width: 2
                    },
                    label: {
                        formatter: '平均值: 110.40',
                        position: 'end',
                        color: '#2c1810',
                        fontSize: isMobileDevice ? 10 : 12
                    }
                }]
            }
        }]
    };
    chart.setOption(option);
}

// 6.2 彩礼金额主导方饼图 - 添加移动端优化
function initDowryDecisionChart() {
    const chart = echarts.init(document.getElementById('dowryDecisionChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '彩礼金额主导方',
            left: 'center',
            top: isMobileDevice ? '5%' : '3%',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: isMobileDevice ? 'horizontal' : 'vertical',
            left: isMobileDevice ? 'center' : 'left',
            top: isMobileDevice ? '18%' : 'center',
            bottom: isMobileDevice ? '10%' : 'auto',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            },
            itemWidth: 12,
            itemHeight: 12,
            itemGap: isMobileDevice ? 8 : 20
        },
        series: [{
            name: '主导方占比',
            type: 'pie',
            radius: isMobileDevice ? ['35%', '60%'] : ['40%', '70%'],
            center: isMobileDevice ? ['50%', '50%'] : ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: isMobileDevice ? 12 : '14',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 56.50, name: '双方父母和子女', itemStyle: { color: '#c41e3a' } },
                { value: 28.10, name: '男女双方', itemStyle: { color: '#d4380d' } },
                { value: 15.40, name: '双方父母', itemStyle: { color: '#d4af37' } }
            ]
        }]
    };
    chart.setOption(option);
}

// 6.5 彩礼象征代际差异分组堆叠条形图 - 添加移动端优化
function initGenerationalDifferencesChart() {
    const chart = echarts.init(document.getElementById('generationalDifferencesChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '"彩礼"象征的代际差异',
            left: 'center',
            top: isMobileDevice ? '5%' : '3%',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['小家庭婚后生活的经济保障', '男方对女方家庭养育的感谢', '传统婚嫁的象征性仪式', '不必要的经济负担', '其他'],
            top: isMobileDevice ? '15%' : '35',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 12
            },
            itemWidth: isMobileDevice ? 10 : 14,
            itemHeight: isMobileDevice ? 10 : 14,
            itemGap: isMobileDevice ? 6 : 15
        },
        grid: {
            left: isMobileDevice ? '15%' : '10%',
            right: isMobileDevice ? '15%' : '10%',
            bottom: isMobileDevice ? '20%' : '15%',
            top: isMobileDevice ? '35%' : '25%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['18-35岁', '36-55岁', '55岁以上'],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            }
        },
        yAxis: {
            type: 'value',
            name: '认知比例 (%)',
            nameTextStyle: {
                fontSize: isMobileDevice ? 11 : 12
            },
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.1)'
                }
            }
        },
        series: [
            {
                name: '小家庭婚后生活的经济保障',
                type: 'bar',
                stack: 'total',
                data: [48, 42, 36],
                itemStyle: {
                    color: '#c41e3a'
                }
            },
            {
                name: '男方对女方家庭养育的感谢',
                type: 'bar',
                stack: 'total',
                data: [23, 18, 36],
                itemStyle: {
                    color: '#d4380d'
                }
            },
            {
                name: '传统婚嫁的象征性仪式',
                type: 'bar',
                stack: 'total',
                data: [17, 26, 14],
                itemStyle: {
                    color: '#d4af37'
                }
            },
            {
                name: '不必要的经济负担',
                type: 'bar',
                stack: 'total',
                data: [9, 11, 7],
                itemStyle: {
                    color: '#f0c674'
                }
            },
            {
                name: '其他',
                type: 'bar',
                stack: 'total',
                data: [3, 3, 7],
                itemStyle: {
                    color: '#8c6239'
                }
            }
        ]
    };
    chart.setOption(option);
}

// 7. 彩礼金额情况双向条形图 - 添加移动端优化
function initAmountComparisonChart() {
    const chart = echarts.init(document.getElementById('amountComparisonChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '彩礼金额情况',
            left: 'center',
            top: isMobileDevice ? '3%' : '10',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['实际彩礼', '理想彩礼'],
            top: isMobileDevice ? '15%' : '35',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            },
            itemWidth: isMobileDevice ? 12 : 16,
            itemHeight: isMobileDevice ? 12 : 16
        },
        grid: {
            left: isMobileDevice ? '15%' : '10%',
            right: isMobileDevice ? '15%' : '10%',
            bottom: isMobileDevice ? '25%' : '20%',
            top: isMobileDevice ? '25%' : '20%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            position: 'top',
            min: -60,
            max: 60,
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11,
                formatter: function(value) {
                    return Math.abs(value) + '%';
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.1)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['零彩礼', '5万元及以下', '5-10万元', '10-20万元', '20万元及以上'],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11,
                interval: 0,
                formatter: function(value) {
                    // 移动端截断过长的文本
                    if (isMobileDevice && value.length > 8) {
                        return value.substring(0, 8) + '...';
                    }
                    return value;
                }
            }
        },
        series: [{
            name: '实际彩礼',
            type: 'bar',
            stack: 'total',
            data: [0.70, 10.45, 35.60, 40.70, 13.95],
            itemStyle: {
                color: '#d4380d'
            },
            label: {
                show: !isMobileDevice,
                position: 'right',
                color: '#2c1810',
                fontSize: 11,
                formatter: '{c}%'
            }
        }, {
            name: '理想彩礼',
            type: 'bar',
            data: [-9.60, -15.90, -40.60, -28, -5.90], // 负值显示在左侧
            itemStyle: {
                color: '#52c41a'
            },
            label: {
                show: !isMobileDevice,
                position: 'left',
                color: '#2c1810',
                fontSize: 11,
                formatter: function(params) {
                    return Math.abs(params.value) + '%';
                }
            }
        }]
    };
    chart.setOption(option);
}

// 8. 公众期待水平条形图 - 添加移动端优化
function initWordCloudChart() {
    const chart = echarts.init(document.getElementById('wordCloudChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '公众对减少彩礼纠纷的期待',
            left: 'center',
            top: isMobileDevice ? '5%' : '3%',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                return `${params[0].name}<br/>支持率：${params[0].value}%`;
            },
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#c41e3a',
            borderWidth: 1,
            textStyle: {
                color: '#2c1810'
            }
        },
        grid: {
            left: isMobileDevice ? '5%' : '8%',
            right: isMobileDevice ? '5%' : '8%',
            bottom: isMobileDevice ? '8%' : '5%',
            top: isMobileDevice ? '15%' : '20%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: '支持率 (%)',
            nameTextStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            },
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(140, 98, 57, 0.1)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: [
                '法律明确说清哪些算彩礼、该退多少',
                '彩礼存进专门账户，婚后再用',
                '婚前做婚恋辅导，提前沟通彩礼问题',
                '整治婚介虚假宣传、婚骗',
                '媒体多宣传理性婚恋观',
                '党员干部带头办低彩礼/零彩礼婚礼',
                '村里/社区定彩礼上限标准'
            ],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11,
                interval: 0,
                formatter: function(value) {
                    // 截断过长的文本
                    const maxLength = isMobileDevice ? 12 : 25;
                    if (value.length > maxLength) {
                        return value.substring(0, maxLength) + '...';
                    }
                    return value;
                }
            }
        },
        series: [{
            name: '支持率',
            type: 'bar',
            barWidth: isMobileDevice ? '60%' : '70%',
            data: [65, 55, 53, 39, 34, 26, 24],
            itemStyle: {
                color: function(params) {
                    // 使用红色渐变，从深红到浅红
                    const colors = ['#c41e3a', '#d4380d', '#d4380d', '#d4380d', '#d4380d', '#d4380d', '#d4380d'];
                    return {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: colors[params.dataIndex] || '#c41e3a'
                        }, {
                            offset: 1, color: '#e6a0a0'
                        }]
                    };
                },
                borderRadius: [0, 4, 4, 0]
            },
            label: {
                show: true,
                position: 'right',
                color: '#2c1810',
                fontSize: isMobileDevice ? 10 : 11,
                fontWeight: 'bold',
                formatter: '{c}%'
            }
        }]
    };
    chart.setOption(option);
}

// 填充数据表格
function populateDataTables() {
    // 彩礼返还情况表格
    const refundDataTable = document.getElementById('refundDataTable');
    const refundData = [
        {
            reason: '男方隐瞒重大疾病',
            noReturn: '31%',
            fullReturn: '29%',
            avgReturn: '48.59%'
        },
        {
            reason: '女方隐瞒重大疾病',
            noReturn: '9.40%',
            fullReturn: '52.30%',
            avgReturn: '73.10%'
        },
        {
            reason: '男方家庭暴力',
            noReturn: '48.50%',
            fullReturn: '28%',
            avgReturn: '39.48%'
        },
        {
            reason: '女方家庭暴力',
            noReturn: '16.10%',
            fullReturn: '53.10%',
            avgReturn: '69.54%'
        },
        {
            reason: '男方出轨/与他人同居',
            noReturn: '51.10%',
            fullReturn: '29.30%',
            avgReturn: '38.99%'
        },
        {
            reason: '女方出轨/与他人同居',
            noReturn: '15.30%',
            fullReturn: '58.80%',
            avgReturn: '72.88%'
        },
        {
            reason: '男方隐瞒大额债务/婚史',
            noReturn: '40.80%',
            fullReturn: '30.40%',
            avgReturn: '44.36%'
        },
        {
            reason: '女方隐瞒大额债务/婚史',
            noReturn: '13.70%',
            fullReturn: '53.80%',
            avgReturn: '71.20%'
        },
        {
            reason: '女方以结婚为幌子骗彩礼',
            noReturn: '12.70%',
            fullReturn: '68.80%',
            avgReturn: '78.99%'
        }
    ];

    refundData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.reason}</td>
            <td>${item.noReturn}</td>
            <td>${item.fullReturn}</td>
            <td>${item.avgReturn}</td>
        `;
        refundDataTable.appendChild(row);
    });
}

// 导航栏交互
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    // 移动端菜单切换
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 导航链接点击处理
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // 关闭移动端菜单
            navMenu.classList.remove('active');
        });
    });

    // 滚动时导航栏状态变化
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 滚动效果
function initializeScrollEffects() {
    const ribbonSegments = document.querySelectorAll('.ribbon-segment');
    const sections = document.querySelectorAll('.section');

    // 红绸视觉线索动画
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                ribbonSegments[index]?.classList.add('active');
            } else {
                ribbonSegments[index]?.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 封面滚动动画
    const coverSection = document.querySelector('.cover-section');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        coverSection.style.transform = `translateY(${rate}px)`;
    });
}

// 回到顶部按钮
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 加载动画
function initializeLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');

    // 模拟加载时间
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);

    // 响应式图表调整
    window.addEventListener('resize', () => {
        const charts = document.querySelectorAll('.echart-chart');
        charts.forEach(chart => {
            const echartInstance = echarts.getInstanceByDom(chart);
            if (echartInstance) {
                echartInstance.resize();
            }
        });
    });
}