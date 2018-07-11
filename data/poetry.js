var poetry = [{
    author: '李白',
    title: '望庐山瀑布',
    content: '日照香炉生紫烟，\n遥看瀑布挂前川。\n飞流直下三千尺，\n疑是银河落九天。'
  },
  {
    author: '李商隐',
    title: '夜雨寄北',
    content: '君问归期未有期，\n巴山夜雨涨秋池。\n何当共剪西窗烛，\n却话巴山夜雨时。'
  },
  {
    author: '李商隐',
    title: '锦瑟',
    content: '锦瑟无端五十弦，\n一弦一柱思华年。\n庄生晓梦迷蝴蝶，\n望帝春心托杜鹃。\n沧海月明珠有泪，\n蓝田日暖玉生烟。\n此情可待成追忆？\n只是当时已惘然。'
  },
  {
    author: '杜牧',
    title: '山行',
    content: '远上寒山石径斜，\n白云深处有人家。\n停车坐爱枫林晚，\n霜叶红于二月花。'
  },
  {
    author: '白居易',
    title: '白云泉',
    content: '天平山上白云泉，\n云自无心水自闲。\n何必奔冲山下去，\n更添波浪向人间。'
  },
  {
    author: '杜牧',
    title: '清明',
    content: '清明时节雨纷纷，\n路上行人欲断魂。\n借问酒家何处有？\n牧童遥指杏花村。'
  },
  {
    author: '柳宗元',
    title: '江雪',
    content: '千山鸟飞绝，\n万径人踪灭。\n孤舟蓑笠翁，\n独钓寒江雪。'
  },
  {
    author: '李白',
    title: '夏日山中',
    content: '懒摇白羽扇，\n裸袒青林中。\n脱巾挂石壁，\n露顶洒松风。'
  },
  {
    author: '李清照',
    title: '夏日绝句',
    content: '生当作人杰，\n死亦为鬼雄。\n至今思项羽，\n不肯过江东。'
  },
  {
    author: '朱熹',
    title: '春日',
    content: '胜日寻芳泗水滨，\n无边光景一时新。\n等闲识得东风面，\n万紫千红总是春。'
  },
  {
    author: '王安石 ',
    title: '梅花',
    content: '墙角数枝梅，\n凌寒独自开。\n遥知不是雪，\n为有暗香来。'
  },
  
]
var testData = [{
  question: '本次世界杯吉祥物扎比瓦卡是一只？',
  orderNum: 1,
  last: false,
  answer: {
    A: {
      text: '白狐',
      isRight: 0
    },
    B: {
      text: '哈士奇',
      isRight: 0
    },
    C: {
      text: '平原狼',
      isRight: 1
    },
    D: {
      text: '阿拉斯加',
      isRight: 0
    },
  }
}, 

]
module.exports = {
  poetry: poetry,
}