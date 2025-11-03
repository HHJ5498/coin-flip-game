import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    // 동전 뒤집기 애니메이션 시간
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(newResult);
      setStats(prev => ({
        ...prev,
        [newResult]: prev[newResult] + 1
      }));
      setIsFlipping(false);
    }, 1500);
  };

  const resetStats = () => {
    setStats({ heads: 0, tails: 0 });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            <i className="fas fa-coins text-yellow-500 mr-3"></i>
            코인 플리퍼 프로
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Game Area */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="text-center">
            {/* Coin */}
            <div className="mb-8">
              <div className={'relative mx-auto w-48 h-48 ' + (isFlipping ? 'animate-spin' : '')}>
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                  <div className="text-6xl text-white">
                    {isFlipping ? (
                      <i className="fas fa-sync-alt animate-spin"></i>
                    ) : result === 'heads' ? (
                      <i className="fas fa-crown"></i>
                    ) : result === 'tails' ? (
                      <i className="fas fa-star"></i>
                    ) : (
                      <i className="fas fa-coins"></i>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Result */}
            {result && !isFlipping && (
              <div className="mb-6">
                <h2 className={'text-4xl font-bold mb-2 ' + (result === 'heads' ? 'text-blue-600' : 'text-purple-600')}>
                  {result === 'heads' ? '앞면!' : '뒷면!'}
                </h2>
                <p className="text-lg text-gray-600">
                  {result === 'heads' ? '운이 좋네요! 👑' : '다음번엔 더 좋을 거예요! ⭐'}
                </p>
              </div>
            )}

            {/* Flip Button */}
            <button
              onClick={flipCoin}
              disabled={isFlipping}
              className={'px-12 py-4 rounded-full text-xl font-bold text-white transition-all duration-300 whitespace-nowrap cursor-pointer ' +
                (isFlipping 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                )}
            >
              {isFlipping ? (
                <>
                  <i className="fas fa-spinner animate-spin mr-2"></i>
                  동전을 던지는 중...
                </>
              ) : (
                <>
                  <i className="fas fa-hand-pointer mr-2"></i>
                  동전 던지기
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl text-blue-500 mb-2">
              <i className="fas fa-crown"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">앞면</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.heads}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl text-purple-500 mb-2">
              <i className="fas fa-star"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">뒷면</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.tails}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl text-gray-500 mb-2">
              <i className="fas fa-calculator"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">총 횟수</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.heads + stats.tails}</p>
            <button
              onClick={resetStats}
              className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-redo mr-1"></i>
              초기화
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <i className="fas fa-info-circle text-blue-500 mr-2"></i>
            게임 방법
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 규칙</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 동전 던지기 버튼을 클릭하세요</li>
                <li>• 동전이 돌면서 결과가 나옵니다</li>
                <li>• 앞면(👑) 또는 뒷면(⭐)이 나옵니다</li>
                <li>• 통계에서 결과를 확인하세요</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 팁</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 확률은 항상 50:50입니다</li>
                <li>• 여러 번 던져서 패턴을 확인해보세요</li>
                <li>• 초기화 버튼으로 새로 시작할 수 있습니다</li>
                <li>• 결정을 내리기 어려울 때 활용하세요</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 코인 플리퍼 프로. 모든 권리 보유. | 
            <a href="https://readdy.ai/?origin=logo" className="text-blue-400 hover:text-blue-300 ml-1">
              Website Builder
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;