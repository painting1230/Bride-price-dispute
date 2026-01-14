// script.js - 彩礼纠纷大数据网页交互逻辑

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initRedRibbon();
    initCharts();
    initBackToTop();
    initLoading();

    // 加载完成后隐藏加载界面
    setTimeout(() => {
        hideLoading();
    }, 1500);
});

// ===== 导航栏交互 =====
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接后关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== 红绸动画 =====
function initRedRibbon() {
    const ribbonSegments = [
        document.getElementById('ribbonSegment1'),
        document.getElementById('ribbonSegment2'),
        document.getElementById('ribbonSegment3'),
        document.getElementById('ribbonSegment4'),
        document.getElementById('ribbonSegment5')
    ];

    const ribbonReconnect = document.getElementById('ribbonReconnect');

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // 根据滚动位置控制红绸断裂/连接
        ribbonSegments.forEach((segment, index) => {
            const segmentPosition = (index + 1) * 200; // 每个段落的触发位置

            if (scrollPosition > segmentPosition) {
                segment.classList.add('broken');
            } else {
                segment.classList.remove('broken');
            }
        });

        // 到达页面底部时显示重新连接的动画
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollPosition + windowHeight >= documentHeight - 100) {
            ribbonReconnect.classList.add('visible');

            // 所有红绸段重新连接
            ribbonSegments.forEach(segment => {
                segment.classList.remove('broken');
                segment.classList.add('connected');
            });
        } else {
            ribbonReconnect.classList.remove('visible');
            ribbonSegments.forEach(segment => {
                segment.classList.remove('connected');
            });
        }
    });
}

// ===== 图表初始化 =====
function initCharts() {
    // 等待ECharts完全加载
    if (typeof echarts === 'undefined') {
        console.error('ECharts未加载');
        return;
    }

    // 初始化所有图表
    initCaseTrendChart();
    initExperienceChart();
    initRegionalMap();
    initSceneChart();
    initPerceptionCharts();
    initRefundTable();
    initGenderRatioChart();
    initAmountComparisonChart();
    initWordCloud();
}

// 1. 案件数量变化折线图
function initCaseTrendChart() {
    const chartDom = document.getElementById('caseTrendChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);

    const data = [
        {year: 2020, cases: 11747},
        {year: 2021, cases: 10234},
        {year: 2022, cases: 6405},
        {year: 2023, cases: 4962},
        {year: 2024, cases: 5085},
        {year: 2025, cases: 4501}
    ];

    const option = {
        color: ['#C53A3A'],
        title: {
            text: '全国彩礼纠纷案件数量变化趋势',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}年：{c}件',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#C53A3A',
            borderWidth: 1,
            textStyle: {
                color: '#333'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.year),
            axisLine: {
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333'
            }
        },
        yAxis: {
            type: 'value',
            name: '案件数量（件）',
            nameTextStyle: {
                color: '#666'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333',
                formatter: '{value}'
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '案件数量',
                type: 'line',
                data: data.map(item => item.cases),
                smooth: true,
                lineStyle: {
                    width: 4,
                    shadowColor: 'rgba(197, 58, 58, 0.3)',
                    shadowBlur: 10
                },
                itemStyle: {
                    color: '#C53A3A',
                    borderColor: '#FFF',
                    borderWidth: 2
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: 'rgba(197, 58, 58, 0.4)'},
                        {offset: 1, color: 'rgba(197, 58, 58, 0.1)'}
                    ])
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最高'},
                        {type: 'min', name: '最低'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };

    chart.setOption(option);

    // 响应窗口大小变化
    window.addEventListener('resize', () => chart.resize());
}

// 2. 纠纷经历饼图
function initExperienceChart() {
    const chartDom = document.getElementById('experiencePieChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);

    const data = [
        {name: '亲友经历过', value: 9.69},
        {name: '自己经历过', value: 5.28},
        {name: '听说过具体案例', value: 36.07},
        {name: '从没了解过', value: 48.96}
    ];

    const option = {
        color: ['#C53A3A', '#D4AF37', '#8B5A2B', '#B3B3B3'],
        title: {
            text: '公众对彩礼纠纷的直接感知',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#C53A3A',
            borderWidth: 1
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'center',
            textStyle: {
                color: '#333'
            }
        },
        series: [
            {
                name: '经历类型',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center',
                    formatter: '{b}\n{c}%',
                    fontSize: 14
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 3. 地区分布地图
function initRegionalMap() {
    const chartDom = document.getElementById('chinaMapChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);

    // 地区数据
    const regionData = [
        {name: '河南省', value: 7703},
        {name: '山东省', value: 3757},
        {name: '甘肃省', value: 3683},
        {name: '安徽省', value: 3259},
        {name: '河北省', value: 2341},
        {name: '江西省', value: 2068},
        {name: '辽宁省', value: 1504},
        {name: '湖南省', value: 1471},
        {name: '四川省', value: 1467},
        {name: '陕西省', value: 1413},
        {name: '湖北省', value: 1385},
        {name: '山西省', value: 1283},
        {name: '贵州省', value: 1211},
        {name: '江苏省', value: 1108},
        {name: '福建省', value: 984},
        {name: '云南省', value: 950},
        {name: '吉林省', value: 868},
        {name: '内蒙古自治区', value: 845},
        {name: '青海省', value: 672},
        {name: '广东省', value: 651},
        {name: '浙江省', value: 649},
        {name: '重庆市', value: 620},
        {name: '宁夏回族自治区', value: 596},
        {name: '北京市', value: 546},
        {name: '广西壮族自治区', value: 534},
        {name: '黑龙江省', value: 513},
        {name: '上海市', value: 338},
        {name: '新疆维吾尔自治区', value: 225},
        {name: '天津市', value: 221},
        {name: '海南省', value: 39},
        {name: '西藏自治区', value: 3}
    ];

    // 填充表格数据
    const tableBody = document.getElementById('topRegionsTable');
    if (tableBody) {
        const top10 = regionData.slice(0, 10);
        tableBody.innerHTML = top10.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.value.toLocaleString()}</td>
            </tr>
        `).join('');
    }

    const option = {
        title: {
            text: '各地区彩礼纠纷案件分布 (2020~2025年)',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return `${params.name}<br/>累计案件数：${params.value.toLocaleString()}件`;
            },
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#C53A3A',
            borderWidth: 1
        },
        visualMap: {
            left: 'right',
            min: 0,
            max: 8000,
            text: ['高', '低'],
            calculable: true,
            inRange: {
                color: ['#FFF5F5', '#FCA5A5', '#F87171', '#DC2626']
            },
            textStyle: {
                color: '#333'
            }
        },
        series: [
            {
                name: '案件数量',
                type: 'map',
                map: 'china',
                roam: false,
                zoom: 1.2,
                emphasis: {
                    label: {
                        show: true
                    },
                    itemStyle: {
                        areaColor: '#9C2C2C'
                    }
                },
                data: regionData,
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 4. 纠纷场景条形图
function initSceneChart() {
    const chartDom = document.getElementById('sceneBarChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);

    const data = [
        {name: '彩礼范围争议', value: 227},
        {name: '无关', value: 209},
        {name: '未登记/短婚闪离', value: 134},
        {name: '过错争议', value: 48},
        {name: '婚托婚骗', value: 16},
        {name: '男方家庭困难', value: 12}
    ];

    const option = {
        color: ['#C53A3A'],
        title: {
            text: '2025年彩礼纠纷案件场景分类',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c}件',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#C53A3A',
            borderWidth: 1
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: '案件数量（件）',
            nameTextStyle: {
                color: '#666'
            },
            axisLine: {
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333'
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLine: {
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333'
            }
        },
        series: [
            {
                name: '案件数量',
                type: 'bar',
                data: data.map(item => item.value),
                barWidth: '60%',
                itemStyle: {
                    borderRadius: [0, 5, 5, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {offset: 0, color: '#C53A3A'},
                        {offset: 1, color: '#E6A0A0'}
                    ])
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}件',
                    color: '#333'
                }
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 5. 彩礼范围认知图表
function initPerceptionCharts() {
    // 雷达图 - 彩礼范围总认知
    const radarChartDom = document.getElementById('perceptionRadarChart');
    if (radarChartDom) {
        const chart = echarts.init(radarChartDom);

        const option = {
            title: {
                text: '公众对"彩礼"范围的认知',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}: {c}%',
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: '#C53A3A',
                borderWidth: 1
            },
            radar: {
                indicator: [
                    {name: '男方直接给女方家庭的现金', max: 100},
                    {name: '三金/五金', max: 100},
                    {name: '恋爱时的大额礼物', max: 100},
                    {name: '汽车、房产', max: 100},
                    {name: '改口费、压箱钱', max: 100},
                    {name: '婚礼红包/礼金', max: 100}
                ],
                center: ['50%', '55%'],
                radius: '65%',
                splitNumber: 4,
                shape: 'circle',
                splitArea: {
                    areaStyle: {
                        color: ['rgba(197, 58, 58, 0.05)', 'rgba(197, 58, 58, 0.1)',
                                'rgba(197, 58, 58, 0.15)', 'rgba(197, 58, 58, 0.2)'],
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(139, 90, 43, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(139, 90, 43, 0.3)'
                    }
                }
            },
            series: [
                {
                    name: '认知比例',
                    type: 'radar',
                    data: [
                        {
                            value: [80, 70, 49, 38, 40, 15],
                            name: '认知比例',
                            symbol: 'circle',
                            symbolSize: 8,
                            lineStyle: {
                                width: 3,
                                color: '#C53A3A'
                            },
                            areaStyle: {
                                color: 'rgba(197, 58, 58, 0.3)'
                            },
                            itemStyle: {
                                color: '#C53A3A'
                            }
                        }
                    ]
                }
            ]
        };

        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }

    // 分组条形图 - 性别认知差异
    const genderChartDom = document.getElementById('genderPerceptionChart');
    if (genderChartDom) {
        const chart = echarts.init(genderChartDom);

        const option = {
            title: {
                text: '不同性别对彩礼范围的认知差异',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: '#C53A3A',
                borderWidth: 1
            },
            legend: {
                data: ['女性', '男性'],
                top: '8%',
                textStyle: {
                    color: '#333'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '20%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: '认知比例 (%)',
                nameTextStyle: {
                    color: '#666'
                },
                axisLine: {
                    lineStyle: {
                        color: '#8B5A2B'
                    }
                },
                axisLabel: {
                    color: '#333',
                    formatter: '{value}%'
                },
                splitLine: {
                    lineStyle: {
                        color: '#f0f0f0'
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: ['男方直接给女方家庭的现金', '三金/五金', '汽车、房产',
                       '改口费、压箱钱', '婚礼红包/礼金', '恋爱时的大额礼物'],
                axisLine: {
                    lineStyle: {
                        color: '#8B5A2B'
                    }
                },
                axisLabel: {
                    color: '#333'
                }
            },
            series: [
                {
                    name: '女性',
                    type: 'bar',
                    stack: 'total',
                    data: [80, 71, 52, 42, 41, 12],
                    itemStyle: {
                        color: '#C53A3A'
                    },
                    label: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}%',
                        color: '#fff'
                    }
                },
                {
                    name: '男性',
                    type: 'bar',
                    stack: 'total',
                    data: [74, 63, 42, 39, 42, 14],
                    itemStyle: {
                        color: '#8B5A2B'
                    },
                    label: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}%',
                        color: '#fff'
                    }
                }
            ]
        };

        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }
}

// 6. 彩礼返还情况表格
function initRefundTable() {
    const tableBody = document.getElementById('refundDataTable');
    if (!tableBody) return;

    const data = [
        {reason: '男方隐瞒重大疾病', noReturn: '31%', fullReturn: '29%', avgReturn: '48.59%'},
        {reason: '女方隐瞒重大疾病', noReturn: '9.40%', fullReturn: '52.30%', avgReturn: '73.10%'},
        {reason: '男方家庭暴力', noReturn: '48.50%', fullReturn: '28%', avgReturn: '39.48%'},
        {reason: '女方家庭暴力', noReturn: '16.10%', fullReturn: '53.10%', avgReturn: '69.54%'},
        {reason: '男方出轨/与他人同居', noReturn: '51.10%', fullReturn: '29.30%', avgReturn: '38.99%'},
        {reason: '女方出轨/与他人同居', noReturn: '15.30%', fullReturn: '58.80%', avgReturn: '72.88%'},
        {reason: '男方隐瞒大额债务/婚史', noReturn: '40.80%', fullReturn: '30.40%', avgReturn: '44.36%'},
        {reason: '女方隐瞒大额债务/婚史', noReturn: '13.70%', fullReturn: '53.80%', avgReturn: '71.20%'},
        {reason: '女方以结婚为幌子骗彩礼', noReturn: '12.70%', fullReturn: '68.80%', avgReturn: '78.99%'}
    ];

    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.reason}</td>
            <td>${item.noReturn}</td>
            <td>${item.fullReturn}</td>
            <td>${item.avgReturn}</td>
        </tr>
    `).join('');
}

// 7. 性别比例条形图
function initGenderRatioChart() {
    const chartDom = document.getElementById('genderRatioChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);

    const data = [
        {age: '20-24岁', ratio: 113.98},
        {age: '25-29岁', ratio: 112.74},
        {age: '30-34岁', ratio: 109.43},
        {age: '35-39岁', ratio: 105.44},
        {age: '平均', ratio: 104.07}
    ];

    const option = {
        color: ['#C53A3A'],
        title: {
            text: '2024年适婚年龄男女性别比 (女=100)',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c}',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#C53A3A',
            borderWidth: 1
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.age),
            axisLine: {
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333'
            }
        },
        yAxis: {
            type: 'value',
            name: '性别比 (女=100)',
            nameTextStyle: {
                color: '#666'
            },
            axisLine: {
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333'
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '性别比',
                type: 'bar',
                data: data.map(item => item.ratio),
                barWidth: '50%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: '#C53A3A'},
                        {offset: 1, color: '#E6A0A0'}
                    ]),
                    borderRadius: [5, 5, 0, 0]
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    color: '#333'
                }
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 8. 彩礼金额对比条形图
function initAmountComparisonChart() {
    const chartDom = document.getElementById('amountComparisonChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);

    const data = [
        {amount: '零彩礼', actual: 0.70, ideal: 9.60},
        {amount: '5万元及以下', actual: 10.45, ideal: 15.90},
        {amount: '5-10万元', actual: 35.60, ideal: 40.60},
        {amount: '10-20万元', actual: 40.70, ideal: 28},
        {amount: '20万元及以上', actual: 13.95, ideal: 5.90}
    ];

    const option = {
        title: {
            text: '彩礼金额：现实与理想的差距',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                return `${params[0].name}<br/>
                ${params[0].marker}实际彩礼：${params[0].value}%<br/>
                ${params[1].marker}理想彩礼：${params[1].value}%`;
            },
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#C53A3A',
            borderWidth: 1
        },
        legend: {
            data: ['实际彩礼', '理想彩礼'],
            top: '8%',
            textStyle: {
                color: '#333'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.amount),
            axisLine: {
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333'
            }
        },
        yAxis: {
            type: 'value',
            name: '比例 (%)',
            nameTextStyle: {
                color: '#666'
            },
            axisLine: {
                lineStyle: {
                    color: '#8B5A2B'
                }
            },
            axisLabel: {
                color: '#333',
                formatter: '{value}%'
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0'
                }
            }
        },
        series: [
            {
                name: '实际彩礼',
                type: 'bar',
                data: data.map(item => item.actual),
                itemStyle: {
                    color: '#C53A3A',
                    borderRadius: [5, 5, 0, 0]
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#333'
                }
            },
            {
                name: '理想彩礼',
                type: 'bar',
                data: data.map(item => item.ideal),
                itemStyle: {
                    color: '#8B5A2B',
                    borderRadius: [5, 5, 0, 0]
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#333'
                }
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 9. 词云图
function initWordCloud() {
    const chartDom = document.getElementById('wordCloudChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);

    // 词云数据
    const wordData = [
        {name: '彩礼', value: 85},
        {name: '结婚', value: 18},
        {name: '双方', value: 15},
        {name: '女方', value: 14},
        {name: '男方', value: 13},
        {name: '家庭', value: 12},
        {name: '金额', value: 10},
        {name: '协商', value: 8},
        {name: '应该', value: 7},
        {name: '认为', value: 7},
        {name: '嫁妆', value: 6},
        {name: '沟通', value: 5},
        {name: '减少', value: 5},
        {name: '适当', value: 5},
        {name: '纠纷', value: 5},
        {name: '生育', value: 4},
        {name: '取消', value: 4},
        {name: '零彩礼', value: 4},
        {name: '问题', value: 4},
        {name: '保障', value: 3},
        {name: '门当户对', value: 2},
        {name: '自愿', value: 2},
        {name: '攀比', value: 2},
        {name: '法律', value: 2},
        {name: '感情', value: 2},
        {name: '压力', value: 2},
        {name: '意义', value: 2},
        {name: '启动金', value: 2}
    ];

    // 检查是否支持词云图
    if (!echarts.registerShape) {
        // 如果不支持词云，使用条形图替代
        const barOption = {
            title: {
                text: '彩礼相关关键词词频统计',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: '{b}: {c}次',
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: '#C53A3A',
                borderWidth: 1
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: '出现频次',
                nameTextStyle: {
                    color: '#666'
                },
                axisLine: {
                    lineStyle: {
                        color: '#8B5A2B'
                    }
                },
                axisLabel: {
                    color: '#333'
                },
                splitLine: {
                    lineStyle: {
                        color: '#f0f0f0'
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: wordData.slice(0, 15).map(item => item.name), // 只显示前15个
                axisLine: {
                    lineStyle: {
                        color: '#8B5A2B'
                    }
                },
                axisLabel: {
                    color: '#333'
                }
            },
            series: [
                {
                    name: '词频',
                    type: 'bar',
                    data: wordData.slice(0, 15).map(item => item.value),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {offset: 0, color: '#C53A3A'},
                            {offset: 1, color: '#E6A0A0'}
                        ]),
                        borderRadius: [0, 5, 5, 0]
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{c}次',
                        color: '#333'
                    }
                }
            ]
        };

        chart.setOption(barOption);
    } else {
        // 如果支持词云，使用词云图
        const option = {
            title: {
                text: '彩礼相关关键词词云',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                show: true,
                formatter: function(params) {
                    return `${params.name}: ${params.value}次`;
                },
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: '#C53A3A',
                borderWidth: 1
            },
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                left: 'center',
                top: 'center',
                width: '90%',
                height: '90%',
                sizeRange: [12, 60],
                rotationRange: [-90, 90],
                rotationStep: 45,
                gridSize: 8,
                drawOutOfBound: false,
                textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    color: function() {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160 + 60), // 红色通道
                            Math.round(Math.random() * 80 + 40),  // 绿色通道
                            Math.round(Math.random() * 80 + 40)   // 蓝色通道
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    textStyle: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: wordData
            }]
        };

        chart.setOption(option);
    }

    window.addEventListener('resize', () => chart.resize());
}

// ===== 回到顶部按钮 =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 加载动画 =====
function initLoading() {
    // 初始显示加载界面
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');

        // 延迟移除元素，等待动画完成
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }
}

// ===== 页面性能优化 =====
// 懒加载图表（当图表进入视口时再初始化）
function lazyLoadCharts() {
    const chartElements = document.querySelectorAll('.echart-chart');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                // 根据图表ID重新初始化
                switch(chartId) {
                    case 'caseTrendChart':
                        initCaseTrendChart();
                        break;
                    case 'experiencePieChart':
                        initExperienceChart();
                        break;
                    // 其他图表类似...
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });

    chartElements.forEach(chart => {
        observer.observe(chart);
    });
}

// 初始化懒加载
if ('IntersectionObserver' in window) {
    lazyLoadCharts();
}

// ===== 窗口大小变化时重新调整图表 =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 获取所有ECharts实例并调整大小
        const charts = echarts.getInstanceByDom;
        // 这里需要遍历所有图表实例并调用resize()
        // 由于ECharts没有直接获取所有实例的方法，我们通过保存实例来管理
    }, 250);
});

// ===== 打印优化 =====
window.addEventListener('beforeprint', () => {
    // 在打印前调整图表大小
    const chartContainers = document.querySelectorAll('.echart-chart');
    chartContainers.forEach(container => {
        const chart = echarts.getInstanceByDom(container);
        if (chart) {
            chart.resize({
                width: container.clientWidth,
                height: 300
            });
        }
    });
});

// ===== 页面滚动动画 =====
// 为图表添加滚动进入动画
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// 初始化滚动动画
if ('IntersectionObserver' in window) {
    initScrollAnimations();
}

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
    console.error('页面发生错误:', e.error);

    // 显示友好的错误提示
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffebee;
        color: #c62828;
        padding: 15px;
        border-radius: 5px;
        border-left: 4px solid #c62828;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    errorDiv.innerHTML = `
        <strong>图表加载出错</strong><br>
        部分数据可能无法正常显示，请刷新页面重试。
    `;
    document.body.appendChild(errorDiv);

    // 5秒后自动移除错误提示
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
});

// ===== 移动端触摸优化 =====
// 防止双击缩放
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 禁用IOS长按菜单
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
        e.preventDefault();
    }
}, { passive: false });