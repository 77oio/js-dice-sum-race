'use strict';

//选择元素
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
//存在另一种id选择方法 无需#
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activeplayer, playing;

//游戏初始化
const init = function () {
  //starting condition  初始状态
  // score0El.textContent = 0;
  // score1El.textContent = 0;

  //存储两玩家的总分  至100时结束
  scores = [0, 0];

  //设置玩家浮动分数初始值
  currentScore = 0;

  //活跃玩家0/1对应总分数组索引0/1
  activeplayer = 0;

  //游戏状态值  状态变量的应用 只有游戏在玩时那些按钮事件才能触发
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//切换玩家
const switchPlayer = function () {
  //设置数字显示为 0
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;

  //设置累计数字为0  转换后当前浮动数字重新从0开始累计
  currentScore = 0;
  //类方法 toggle 切换状态 当存在时删除 不存在时添加  改变背景样式等
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//摇骰子功能
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.生成一个随机数  在骰子上
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.显示骰子:删除隐藏类 设置骰子的图片资源属性 以字符串形式``
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.检查骰子是否为1，！==1 时可加到总和分数 ==1 时转换为另一位玩家
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      // document.getElementById(`current--${activeplayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

//hold按钮 添加分数功能
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.添加当前分数到对应玩家总分数
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    //2.检查 是否到100 赢得游戏
    //添加赢家类 移除活跃类
    if (scores[activeplayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  //3.切换玩家
});

btnNew.addEventListener('click', init);
