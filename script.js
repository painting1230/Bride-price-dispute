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
            data: [4250, 5120, 5890, 6230, 6150, 5980]
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
            data: ['其他争议', '财产分割争议', '过错争议', '共同生活争议', '彩礼返还争议', '彩礼范围争议'],
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
            data: [45, 68, 48, 112, 187, 227],
            itemStyle: {
                color: function(params) {
                    const colors = ['#8c6239', '#d4af37', '#d4380d', '#c41e3a', '#40a9ff', '#1890ff'];
                    return colors[params.dataIndex];
                }
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
                { name: '男方直接给女方家庭现金', max: 100 },
                { name: '三金/五金', max: 100 },
                { name: '大额转账', max: 100 },
                { name: '购房款', max: 100 },
                { name: '车辆购买', max: 100 },
                { name: '家用电器', max: 100 },
                { name: '节日礼物', max: 100 },
                { name: '日常消费', max: 100 }
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
                value: [80, 70, 65, 45, 35, 25, 15, 8],
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
            text: '不同性别对彩礼金额的认知差异',
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
            data: ['男性认知', '女性认知'],
            top: isMobileDevice ? '15%' : '35',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            },
            itemWidth: isMobileDevice ? 12 : 16,
            itemHeight: isMobileDevice ? 12 : 16
        },
        grid: {
            left: isMobileDevice ? '12%' : '5%',
            right: isMobileDevice ? '12%' : '5%',
            bottom: isMobileDevice ? '20%' : '15%',
            top: isMobileDevice ? '25%' : '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['5万以下', '5-10万', '10-20万', '20-50万', '50-100万', '100万以上'],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                rotate: isMobileDevice ? 45 : 45,
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
        series: [{
            name: '男性认知',
            type: 'bar',
            barWidth: isMobileDevice ? '25%' : '40%',
            data: [15.2, 28.6, 32.1, 18.4, 4.3, 1.4],
            itemStyle: {
                color: '#1890ff'
            }
        }, {
            name: '女性认知',
            type: 'bar',
            barWidth: isMobileDevice ? '25%' : '40%',
            data: [8.7, 22.3, 35.8, 24.1, 7.2, 1.9],
            itemStyle: {
                color: '#d4380d'
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
            text: '20-40岁适婚性别比变化趋势',
            left: 'center',
            top: isMobileDevice ? '3%' : '10',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 14 : 16,
                fontWeight: '600'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['20-30岁', '30-40岁'],
            top: isMobileDevice ? '15%' : '35',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            }
        },
        grid: {
            left: isMobileDevice ? '12%' : '8%',
            right: isMobileDevice ? '12%' : '5%',
            bottom: isMobileDevice ? '20%' : '15%',
            top: isMobileDevice ? '25%' : '25%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2010年', '2015年', '2020年', '2024年'],
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
            name: '性别比 (女=100)',
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
            name: '20-30岁',
            type: 'line',
            smooth: true,
            data: [107.2, 109.8, 111.5, 112.3],
            lineStyle: {
                color: '#c41e3a',
                width: 3
            },
            itemStyle: {
                color: '#c41e3a'
            },
            areaStyle: {
                color: 'rgba(196, 30, 58, 0.1)'
            }
        }, {
            name: '30-40岁',
            type: 'line',
            smooth: true,
            data: [104.8, 106.2, 107.9, 108.7],
            lineStyle: {
                color: '#d4af37',
                width: 3
            },
            itemStyle: {
                color: '#d4af37'
            },
            areaStyle: {
                color: 'rgba(212, 175, 55, 0.1)'
            }
        }]
    };
    chart.setOption(option);
}

// 7. 彩礼金额对比图 - 添加移动端优化
function initAmountComparisonChart() {
    const chart = echarts.init(document.getElementById('amountComparisonChart'));
    const isMobileDevice = isMobile();

    const option = {
        title: {
            text: '婚俗改革前后彩礼金额对比',
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
            data: ['改革前', '改革后'],
            top: isMobileDevice ? '15%' : '35',
            textStyle: {
                color: '#2c1810',
                fontSize: isMobileDevice ? 11 : 12
            },
            itemWidth: isMobileDevice ? 12 : 16,
            itemHeight: isMobileDevice ? 12 : 16
        },
        grid: {
            left: isMobileDevice ? '12%' : '5%',
            right: isMobileDevice ? '12%' : '5%',
            bottom: isMobileDevice ? '25%' : '20%',
            top: isMobileDevice ? '25%' : '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['河南', '山东', '安徽', '江苏', '湖南', '江西', '湖北'],
            axisLine: {
                lineStyle: {
                    color: '#8c6239'
                }
            },
            axisLabel: {
                color: '#2c1810',
                rotate: isMobileDevice ? 45 : 45,
                fontSize: isMobileDevice ? 10 : 11
            }
        },
        yAxis: {
            type: 'value',
            name: '彩礼金额 (万元)',
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
            name: '改革前',
            type: 'bar',
            barWidth: isMobileDevice ? '25%' : '40%',
            data: [25.6, 18.9, 15.3, 12.8, 22.1, 16.7, 19.4],
            itemStyle: {
                color: '#d4380d'
            }
        }, {
            name: '改革后',
            type: 'bar',
            barWidth: isMobileDevice ? '25%' : '40%',
            data: [8.6, 6.2, 5.8, 4.9, 7.3, 5.2, 6.8],
            itemStyle: {
                color: '#52c41a'
            }
        }]
    };
    chart.setOption(option);
}

// 8. 词云图 - 添加移动端优化
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
        tooltip: {},
        series: [{
            type: 'wordCloud',
            shape: 'circle',
            left: 'center',
            top: 'center',
            width: '80%',
            height: '80%',
            right: null,
            bottom: null,
            sizeRange: isMobileDevice ? [10, 40] : [12, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: isMobileDevice ? 6 : 8,
            drawOutOfBound: false,
            textStyle: {
                fontFamily: 'Noto Sans SC',
                fontWeight: 'normal',
                color: function() {
                    const colors = ['#c41e3a', '#d4380d', '#d4af37', '#f0c674', '#1890ff', '#40a9ff', '#52c41a', '#8c6239'];
                    return colors[Math.floor(Math.random() * colors.length)];
                }
            },
            emphasis: {
                focus: 'self',
                textStyle: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: [
                { name: '法律明确', value: 65 },
                { name: '理性婚嫁', value: 58 },
                { name: '降低金额', value: 52 },
                { name: '减少攀比', value: 48 },
                { name: '政府引导', value: 45 },
                { name: '文化传承', value: 42 },
                { name: '家庭教育', value: 38 },
                { name: '媒体监督', value: 35 },
                { name: '社区调解', value: 32 },
                { name: '婚前教育', value: 28 },
                { name: '财产约定', value: 25 },
                { name: '情感基础', value: 22 },
                { name: '社会共识', value: 20 },
                { name: '法治保障', value: 18 },
                { name: '文明新风', value: 15 }
            ]
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
            reason: '隐瞒重大疾病',
            noReturn: '15.2%',
            fullReturn: '68.4%',
            avgReturn: '72.1%'
        },
        {
            reason: '家暴行为',
            noReturn: '8.7%',
            fullReturn: '74.3%',
            avgReturn: '78.6%'
        },
        {
            reason: '出轨/婚外情',
            noReturn: '12.1%',
            fullReturn: '71.8%',
            avgReturn: '75.2%'
        },
        {
            reason: '赌博恶习',
            noReturn: '18.9%',
            fullReturn: '63.2%',
            avgReturn: '68.7%'
        },
        {
            reason: '无过错但未结婚',
            noReturn: '45.6%',
            fullReturn: '35.8%',
            avgReturn: '42.3%'
        },
        {
            reason: '无过错但短婚',
            noReturn: '38.4%',
            fullReturn: '42.1%',
            avgReturn: '48.9%'
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