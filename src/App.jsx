import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Users, Play, RotateCcw, ChevronDown, Sparkles, Crown, Target, Zap } from 'lucide-react';

export default function ImposterGame() {
  const [gameState, setGameState] = useState('setup');
  const [playerNames, setPlayerNames] = useState('');
  const [commonWord, setCommonWord] = useState('');
  const [imposterWord, setImposterWord] = useState('');
  const [players, setPlayers] = useState([]);
  const [imposterIndex, setImposterIndex] = useState(-1);
  const [revealedWords, setRevealedWords] = useState({});
  const [showCommonDropdown, setShowCommonDropdown] = useState(false);
  const [showImposterDropdown, setShowImposterDropdown] = useState(false);
  const [animating, setAnimating] = useState(false);

  const wordPairs = [
    { common: 'Pizza', imposter: 'Burger' },
    { common: 'Coffee', imposter: 'Tea' },
    { common: 'Apple', imposter: 'Orange' },
    { common: 'Dog', imposter: 'Cat' },
    { common: 'Car', imposter: 'Bike' },
    { common: 'Phone', imposter: 'Laptop' },
    { common: 'Book', imposter: 'Magazine' },
    { common: 'Movie', imposter: 'TV Show' },
    { common: 'Beach', imposter: 'Pool' },
    { common: 'Mountain', imposter: 'Hill' },
    { common: 'River', imposter: 'Lake' },
    { common: 'Sun', imposter: 'Moon' },
    { common: 'Fire', imposter: 'Ice' },
    { common: 'Tree', imposter: 'Bush' },
    { common: 'Bird', imposter: 'Bat' },
    { common: 'House', imposter: 'Apartment' },
    { common: 'School', imposter: 'University' },
    { common: 'Hospital', imposter: 'Clinic' },
    { common: 'Restaurant', imposter: 'Cafe' },
    { common: 'Park', imposter: 'Garden' },
    { common: 'Football', imposter: 'Soccer' },
    { common: 'Basketball', imposter: 'Volleyball' },
    { common: 'Swimming', imposter: 'Diving' },
    { common: 'Guitar', imposter: 'Violin' },
    { common: 'Painting', imposter: 'Drawing' },
    { common: 'Winter', imposter: 'Summer' },
    { common: 'Doctor', imposter: 'Nurse' },
    { common: 'Teacher', imposter: 'Professor' },
    { common: 'Bread', imposter: 'Toast' },
    { common: 'Chicken', imposter: 'Turkey' },
    { common: 'Lion', imposter: 'Tiger' },
    { common: 'Elephant', imposter: 'Hippo' },
    { common: 'Shirt', imposter: 'T-shirt' },
    { common: 'Shoes', imposter: 'Sandals' },
    { common: 'Rain', imposter: 'Snow' },
    { common: 'Thunder', imposter: 'Lightning' },
    { common: 'Chair', imposter: 'Stool' },
    { common: 'Table', imposter: 'Desk' },
    { common: 'Knife', imposter: 'Fork' },
    { common: 'Spoon', imposter: 'Chopsticks' },
    { common: 'Bicycle', imposter: 'Motorcycle' },
    { common: 'Train', imposter: 'Bus' },
    { common: 'Airplane', imposter: 'Helicopter' },
    { common: 'Dancing', imposter: 'Singing' },
    { common: 'Reading', imposter: 'Writing' },
    { common: 'Running', imposter: 'Jogging' },
    { common: 'Island', imposter: 'Peninsula' },
    { common: 'Forest', imposter: 'Jungle' },
    { common: 'Castle', imposter: 'Palace' },
    { common: 'Diamond', imposter: 'Ruby' }
  ];

  const startGame = () => {
    const names = playerNames
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (names.length < 3) {
      alert('Need at least 3 players!');
      return;
    }
    
    if (!commonWord.trim() || !imposterWord.trim()) {
      alert('Please enter both words!');
      return;
    }

    setAnimating(true);
    
    setTimeout(() => {
      const randomImposter = Math.floor(Math.random() * names.length);
      console.log(`Total players: ${names.length}, Imposter index: ${randomImposter}, Imposter: ${names[randomImposter]}`);
      
      setPlayers(names);
      setImposterIndex(randomImposter);
      setGameState('playing');
      setRevealedWords({});
      setAnimating(false);
    }, 1500);
  };

  const toggleWordReveal = (playerIndex) => {
    setRevealedWords(prev => ({
      ...prev,
      [playerIndex]: !prev[playerIndex]
    }));
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayerNames('');
    setCommonWord('');
    setImposterWord('');
    setPlayers([]);
    setImposterIndex(-1);
    setRevealedWords({});
    setShowCommonDropdown(false);
    setShowImposterDropdown(false);
  };

  const getPlayerWord = (playerIndex) => {
    return playerIndex === imposterIndex ? imposterWord : commonWord;
  };

  if (animating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 rounded-full flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">
            Assigning Roles...
          </h2>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mt-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-pink-400 to-purple-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
                Guess the Imposter
              </h1>
              <p className="text-purple-200/80 text-lg">
                Premium Party Game Experience
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-purple-200 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Player Names (comma-separated)
                </label>
                <textarea
                  value={playerNames}
                  onChange={(e) => setPlayerNames(e.target.value)}
                  placeholder="Yash,Kunal,Sahil,Kavi...."
                  className="w-full p-4 bg-white/10 backdrop-blur border border-white/30 rounded-2xl text-white placeholder-purple-300/60 focus:border-pink-400 focus:bg-white/20 focus:outline-none transition-all duration-300 resize-none font-medium"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-200 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Common Word (for most players)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={commonWord}
                    onChange={(e) => setCommonWord(e.target.value)}
                    onFocus={() => setShowCommonDropdown(true)}
                    placeholder="e.g., Pizza or choose from suggestions"
                    className="w-full p-4 pr-12 bg-white/10 backdrop-blur border border-white/30 rounded-2xl text-white placeholder-purple-300/60 focus:border-pink-400 focus:bg-white/20 focus:outline-none transition-all duration-300 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCommonDropdown(!showCommonDropdown)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-pink-400 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  {showCommonDropdown && (
                    <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
                      {wordPairs.map((pair, index) => (
                        <div key={index} className="border-b border-purple-100/50 last:border-b-0">
                          <button
                            type="button"
                            onClick={() => {
                              setCommonWord(pair.common);
                              setImposterWord(pair.imposter);
                              setShowCommonDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-200 border-b border-gray-100/50"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-green-700 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {pair.common}
                              </span>
                              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">+ {pair.imposter}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">Complete pair setup</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCommonWord(pair.common);
                              setShowCommonDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
                          >
                            <span className="text-sm text-blue-600 flex items-center gap-2">
                              <Target className="w-3 h-3" />
                              {pair.common} only
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-200 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Imposter Word (for the imposter)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={imposterWord}
                    onChange={(e) => setImposterWord(e.target.value)}
                    onFocus={() => setShowImposterDropdown(true)}
                    placeholder="e.g., Burger or choose from suggestions"
                    className="w-full p-4 pr-12 bg-white/10 backdrop-blur border border-white/30 rounded-2xl text-white placeholder-purple-300/60 focus:border-pink-400 focus:bg-white/20 focus:outline-none transition-all duration-300 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowImposterDropdown(!showImposterDropdown)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-pink-400 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  {showImposterDropdown && (
                    <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
                      {wordPairs.map((pair, index) => (
                        <div key={index} className="border-b border-purple-100/50 last:border-b-0">
                          <button
                            type="button"
                            onClick={() => {
                              setCommonWord(pair.common);
                              setImposterWord(pair.imposter);
                              setShowImposterDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-200 border-b border-gray-100/50"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-red-700 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {pair.imposter}
                              </span>
                              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">+ {pair.common}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">Complete pair setup</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImposterWord(pair.imposter);
                              setShowImposterDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors"
                          >
                            <span className="text-sm text-red-600 flex items-center gap-2">
                              <Zap className="w-3 h-3" />
                              {pair.imposter} only
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-5 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
              >
                <Play className="w-6 h-6" />
                Launch Game
                <Sparkles className="w-5 h-5 animate-pulse" />
              </button>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-white/20 backdrop-blur">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                How to Play
              </h3>
              <div className="text-sm text-purple-200/90 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="bg-pink-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Each player taps their name to reveal their secret word</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>One player has a different word (the imposter!)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-indigo-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Discuss hints and vote to find the imposter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mt-8">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-pulse">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
              Game Active!
            </h1>
            <p className="text-purple-200/80">
              Tap your name to see your secret word
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {players.map((player, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur rounded-2xl p-5 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {player.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-white text-lg">
                      {player}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleWordReveal(index)}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                      revealedWords[index]
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-red-500/25'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-emerald-500/25'
                    }`}
                  >
                    {revealedWords[index] ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide Word
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Reveal Word
                      </>
                    )}
                  </button>
                </div>
                
                {revealedWords[index] && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-white/20 to-white/10 rounded-xl border-2 border-dashed border-white/30 backdrop-blur animate-pulse">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                        {getPlayerWord(index)}
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </div>
                      <p className="text-purple-200/80 text-sm">Your secret word</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-2xl p-6 backdrop-blur">
              <div className="text-center">
                <div className="text-2xl mb-2">🎭</div>
                <p className="text-yellow-100 font-semibold mb-1">
                  One player has a different word!
                </p>
                <p className="text-yellow-200/80 text-sm">
                  Share hints and find the imposter
                </p>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Start New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}