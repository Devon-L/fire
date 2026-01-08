import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// 奖品数据
const prizes = [
  { id: 1, name: 'AK-47 传说', rarity: 'legendary', image: '🔫', probability: 0.01 },
  { id: 2, name: 'M4A4 史诗', rarity: 'epic', image: '🔫', probability: 0.05 },
  { id: 3, name: 'AWP 稀有', rarity: 'rare', image: '🔫', probability: 0.15 },
  { id: 4, name: '手枪 普通', rarity: 'common', image: '🔫', probability: 0.79 },
  { id: 5, name: '黄金匕首', rarity: 'legendary', image: '🗡️', probability: 0.01 },
  { id: 6, name: '战术背包', rarity: 'epic', image: '🎒', probability: 0.05 },
  { id: 7, name: '护甲套装', rarity: 'rare', image: '🛡️', probability: 0.15 },
  { id: 8, name: '医疗包', rarity: 'common', image: '💊', probability: 0.79 },
  { id: 9, name: '夜视镜', rarity: 'epic', image: '🥽', probability: 0.05 },
  { id: 10, name: '手雷', rarity: 'rare', image: '💣', probability: 0.15 },
  { id: 11, name: '弹药箱', rarity: 'common', image: '📦', probability: 0.79 },
  { id: 12, name: '瞄准镜', rarity: 'rare', image: '🔭', probability: 0.15 },
  { id: 13, name: '战术头盔', rarity: 'epic', image: '⛑️', probability: 0.05 },
  { id: 14, name: '急救包', rarity: 'common', image: '🏥', probability: 0.79 },
  { id: 15, name: '烟雾弹', rarity: 'rare', image: '💨', probability: 0.15 },
  { id: 16, name: '闪光弹', rarity: 'rare', image: '💡', probability: 0.15 },
  { id: 17, name: '金币', rarity: 'common', image: '🪙', probability: 0.79 },
  { id: 18, name: '钻石', rarity: 'legendary', image: '💎', probability: 0.01 },
  { id: 19, name: '能量饮料', rarity: 'common', image: '🥤', probability: 0.79 },
  { id: 20, name: '战术靴', rarity: 'rare', image: '👢', probability: 0.15 },
  { id: 21, name: '通讯设备', rarity: 'epic', image: '📻', probability: 0.05 },
  { id: 22, name: '工具包', rarity: 'common', image: '🧰', probability: 0.79 },
  { id: 23, name: '望远镜', rarity: 'rare', image: '🔍', probability: 0.15 },
  { id: 24, name: '神秘宝箱', rarity: 'legendary', image: '📦', probability: 0.01 }
]

// 稀有度颜色映射
const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-yellow-600'
}

// 稀有度中文名称
const rarityNames = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说'
}

function App() {
  const [lotteryCount, setLotteryCount] = useState(10)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPrize, setCurrentPrize] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [userPrizes, setUserPrizes] = useState([])
  const [showRules, setShowRules] = useState(false)

  // 抽奖逻辑
  const drawPrize = () => {
    if (lotteryCount <= 0 || isDrawing) return

    setIsDrawing(true)
    setShowResult(false)

    // 模拟抽奖动画延迟
    setTimeout(() => {
      const random = Math.random()
      let cumulativeProbability = 0
      let selectedPrize = prizes[prizes.length - 1] // 默认最后一个

      for (const prize of prizes) {
        cumulativeProbability += prize.probability
        if (random <= cumulativeProbability) {
          selectedPrize = prize
          break
        }
      }

      setCurrentPrize(selectedPrize)
      setUserPrizes(prev => [...prev, selectedPrize])
      setLotteryCount(prev => prev - 1)
      setIsDrawing(false)
      setShowResult(true)
    }, 2000)
  }

  // 购买抽奖次数
  const buyLottery = () => {
    setLotteryCount(prev => prev + 10)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-black text-white overflow-x-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/src/assets/background.jpg')] bg-cover bg-center"></div>
      </div>

      {/* 主容器 */}
      <div className="relative z-10">
        {/* 头部区域 */}
        <header className="text-center py-8 px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            传说幽腾：幽冥夺宝
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-yellow-200 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            神秘武器等你来抽取
          </motion.p>
          <motion.p 
            className="text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            活动时间：2025年7月18日 - 2025年8月18日
          </motion.p>
        </header>

        {/* 主抽奖区域 */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <div className="bg-gradient-to-r from-red-800/50 to-red-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-1 mb-4">
                <div className="bg-red-900 rounded-full px-6 py-3">
                  <span className="text-yellow-400 font-bold text-lg">剩余抽奖次数: {lotteryCount}</span>
                </div>
              </div>
            </div>

            {/* 抽奖按钮和结果显示 */}
            <div className="text-center mb-8">
              <AnimatePresence>
                {isDrawing && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-spin">
                      <div className="w-24 h-24 bg-red-900 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎰</span>
                      </div>
                    </div>
                    <p className="text-yellow-400 mt-4 text-lg font-bold">正在抽取中...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showResult && currentPrize && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <div className={`w-48 h-48 mx-auto bg-gradient-to-r ${rarityColors[currentPrize.rarity]} rounded-2xl flex flex-col items-center justify-center border-4 border-yellow-400 shadow-2xl`}>
                      <span className="text-6xl mb-2">{currentPrize.image}</span>
                      <h3 className="text-white font-bold text-lg text-center px-2">{currentPrize.name}</h3>
                      <span className="text-yellow-200 text-sm">{rarityNames[currentPrize.rarity]}</span>
                    </div>
                    <p className="text-yellow-400 mt-4 text-xl font-bold">恭喜获得！</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={drawPrize}
                  disabled={lotteryCount <= 0 || isDrawing}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDrawing ? '抽取中...' : '开始抽奖'}
                </Button>
                
                <Button
                  onClick={buyLottery}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  购买10次抽奖
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 奖品展示网格 */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-yellow-400">奖品展示</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {prizes.map((prize, index) => (
              <motion.div
                key={prize.id}
                className={`bg-gradient-to-r ${rarityColors[prize.rarity]} rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer border border-yellow-500/30`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{prize.image}</div>
                <h3 className="text-white font-bold text-sm mb-1">{prize.name}</h3>
                <span className="text-yellow-200 text-xs">{rarityNames[prize.rarity]}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 活动规则 */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <div className="bg-gradient-to-r from-red-800/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
            <button
              onClick={() => setShowRules(!showRules)}
              className="w-full text-left flex justify-between items-center text-yellow-400 font-bold text-xl mb-4"
            >
              活动规则
              <span className={`transform transition-transform ${showRules ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            <AnimatePresence>
              {showRules && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-gray-300 space-y-3"
                >
                  <p>1. 每次抽奖消耗1次抽奖机会</p>
                  <p>2. 不同稀有度奖品概率：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 传说级：1%</li>
                    <li>• 史诗级：5%</li>
                    <li>• 稀有级：15%</li>
                    <li>• 普通级：79%</li>
                  </ul>
                  <p>3. 所有奖品均为虚拟物品，仅供娱乐</p>
                  <p>4. 活动最终解释权归主办方所有</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 获奖记录 */}
        {userPrizes.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">我的奖品</h2>
            <div className="bg-gradient-to-r from-red-800/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userPrizes.slice(-12).map((prize, index) => (
                  <motion.div
                    key={`${prize.id}-${index}`}
                    className={`bg-gradient-to-r ${rarityColors[prize.rarity]} rounded-lg p-3 text-center`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl mb-1">{prize.image}</div>
                    <h4 className="text-white font-bold text-xs">{prize.name}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 底部信息 */}
        <footer className="text-center py-8 px-4 text-gray-400">
          <p className="mb-2">活动时间：2025年7月18日 - 2025年8月18日</p>
          <p className="text-sm">本活动仅供娱乐，所有奖品均为虚拟物品</p>
        </footer>
      </div>
    </div>
  )
}

export default App

