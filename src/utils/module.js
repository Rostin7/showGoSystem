const moduleList = {}
// children分组预留
moduleList.data = [
  {
    id: 8,
    label: '商场',
    children: []
  },
  {
    id: 5,
    label: '儿童',
    children: [
      {
        id: 6,
        label: '亲子活动'
      },
      {
        id: 7,
        label: '亲子教育'
      },
      {
        id: 10,
        label: '亲子美食'
      },
      {
        id: 11,
        label: '亲子乐园'
      },
      {
        id: 12,
        label: '儿童用品'
      }
    ]
  },
  {
    id: 13,
    label: '美妆',
    children: [
      {
        id: 14,
        label: '医美'
      },
      {
        id: 15,
        label: '美发'
      },
      {
        id: 16,
        label: '美甲'
      },
      {
        id: 17,
        label: '美容'
      },
      {
        id: 18,
        label: '化妆品'
      }
    ]
  },
  {
    id: 19,
    label: '宠物',
    children: [
      {
        id: 20,
        label: '美容'
      },
      {
        id: 21,
        label: '医院'
      },
      {
        id: 22,
        label: '购宠'
      },
      {
        id: 23,
        label: '寄宠'
      },
      {
        id: 24,
        label: '周边'
      }
    ]
  },
  {
    id: 25,
    label: '其他',
    children: [
      {
        id: 26,
        label: '官方'
      },
      // {
      //   id: 27,
      //   label: '未开放'
      // },
      // {
      //   id: 28,
      //   label: '未开放'
      // },
      // {
      //   id: 29,
      //   label: '未开放'
      // },
      // {
      //   id: 30,
      //   label: '未开放'
      // }
    ]
  },
  {
    id: 31,
    label: '美食',
    children: [
      {
        id: 32,
        label: '小吃快餐'
      },
      {
        id: 33,
        label: '火锅烧烤'
      },
      {
        id: 34,
        label: '甜品饮料'
      },
      {
        id: 35,
        label: '海鲜自助'
      },
      {
        id: 36,
        label: '大桌菜'
      },
      {
        id: 50,
        label: '日韩料理'
      },
      {
        id: 51,
        label: '水果生鲜'
      },
      {
        id: 52,
        label: '商超便利'
      }
    ]
  },
  {
    id: 41,
    label: '娱乐',
    children: [
      {
        id: 42,
        label: '电影演出'
      },
      {
        id: 43,
        label: 'KTV/酒吧'
      },
      {
        id: 44,
        label: '健身运动'
      },
      {
        id: 45,
        label: 'SPA'
      },
      {
        id: 46,
        label: '休闲娱乐'
      }
    ]
  },
  {
    id: 37,
    label: '旅游',
    children: [
      {
        id: 38,
        label: '景点'
      },
      {
        id: 39,
        label: '游乐场'
      },
      {
        id: 47,
        label: '周边游'
      },
      {
        id: 48,
        label: '自驾游'
      },
      {
        id: 49,
        label: '亲子游'
      }
    ]
  },
  {
    id: 53,
    label: '大牌',
    children: [
      {
        id: 54,
        label: '大牌一'
      },
      {
        id: 55,
        label: '大牌二'
      },
      {
        id: 56,
        label: '大牌三'
      },
      {
        id: 57,
        label: '大牌四'
      },
      {
        id: 58,
        label: '大牌五'
      }
    ]
  },
  {
    id: 59,
    label: '电商',
    children: [
      {
        id: 60,
        label: '美食'
      },
      {
        id: 61,
        label: '休闲娱乐'
      },
      {
        id: 65,
        label: '电影演出'
      },
      {
        id: 66,
        label: '旅游住宿'
      },
      {
        id: 67,
        label: '购物'
      }
    ]
  },
  {
    id: 71,
    label: '海通年货',
    children: [
      {
        id: 72,
        label: '新品服装'
      },
      {
        id: 73,
        label: '家纺制品'
      },
      {
        id: 74,
        label: '名优年货'
      },
      {
        id: 75,
        label: '南北特产'
      },
      {
        id: 76,
        label: '红木家具'
      }
    ]
  },
  {
    id: 77,
    label: '爱车',
    children: [
      {
        id: 78,
        label: '爱车一'
      },
      {
        id: 79,
        label: '爱车二'
      },
      {
        id: 80,
        label: '爱车三'
      },
      {
        id: 81,
        label: '爱车四'
      },
      {
        id: 82,
        label: '爱车五'
      }
    ]
  },
]
moduleList.photoSize = [
  // 风采展示图片裁剪大小
  {
    width: 680,
    height: 680
  },
  // 店铺logo
  {
    width: 250,
    height: 250
  },
  // 活动展示主图宽高比
  {
    width: 343,
    height: 204
  }
]
export default moduleList
