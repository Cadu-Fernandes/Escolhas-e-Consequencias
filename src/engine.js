// HUMAN ERROR — GAME ENGINE v2
// Motor narrativo — com skip, digitação universal, scroll e responsivo

class GameEngine {
  constructor() {
    this.state = {
      chapter: 0,
      variables: { company: 50, trust: 50, reputation: 50, automation: 10 },
      keyDecisions: [],
      isTyping: false
    };

    this.currentChapter   = null;
    this.currentScene     = null;
    this.sceneQueue       = [];
    this.queueIndex       = 0;
    this.typingInterval   = null;
    this.fullText         = '';
    this.afterTypingCb    = null;

    this.elements = {};
  }

  // ─── INICIALIZAÇÃO ───────────────────────────────────────────
  init() {
    this.elements = {
      screens: {
        intro: document.getElementById('screen-intro'),
        game:  document.getElementById('screen-game'),
        stats: document.getElementById('screen-stats')
      },
      hud: {
        chapter:    document.getElementById('hud-chapter'),
        character:  document.getElementById('hud-character'),
        charRole:   document.getElementById('hud-char-role'),
        charIcon:   document.getElementById('hud-char-icon'),
        sceneTitle: document.getElementById('hud-scene-title')
      },
      bars: {
        company:    document.getElementById('ind-company'),
        trust:      document.getElementById('ind-trust'),
        reputation: document.getElementById('ind-reputation'),
        automation: document.getElementById('ind-automation')
      },
      scene: {
        bg:              document.getElementById('scene-bg'),
        narratorTag:     document.getElementById('narrator-tag'),
        location:        document.getElementById('scene-location'),
        text:            document.getElementById('narrative-text'),
        continueBtn:     document.getElementById('narrative-continue'),
        choicesPanel:    document.getElementById('choices-panel'),
        choicesList:     document.getElementById('choices-list'),
        consequenceFlash: document.getElementById('consequence-flash'),
        cfText:          document.getElementById('cf-text'),
        // Wrapper do scroll
        narrativeBox:    document.getElementById('narrative-box')
      }
    };

    this._bindSkipControls();
  }

  // ─── CONTROLES DE SKIP ───────────────────────────────────────
  // Espaço / Enter / clique na área de cena pulam digitação ou avançam
  _bindSkipControls() {
    // Teclado
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        this._handleSkipOrAdvance();
      }
    });

    // Toque/clique na área de narrativa (não nas escolhas)
    const narrativeBox = document.getElementById('narrative-box');
    if (narrativeBox) {
      narrativeBox.addEventListener('click', (e) => {
        // Só age se o clique não foi em um botão
        if (e.target.closest('button')) return;
        this._handleSkipOrAdvance();
      });
      // Cursor pointer para indicar que é clicável
      narrativeBox.style.cursor = 'pointer';
    }
  }

  _handleSkipOrAdvance() {
    const choicesVisible = this.elements.scene.choicesPanel.style.display !== 'none';
    if (choicesVisible) return; // não interfere com escolhas

    if (this.state.isTyping) {
      // Pula a digitação — mostra o texto completo imediatamente
      this._skipTyping();
    } else {
      // Texto já completo — avança como o botão Continuar
      const contBtn = this.elements.scene.continueBtn;
      if (contBtn.style.display !== 'none') {
        this.continueScene();
      }
    }
  }

  _skipTyping() {
    if (!this.state.isTyping) return;
    // Para o intervalo
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
    // Exibe texto completo
    const el = this.elements.scene.text;
    el.textContent = this.fullText;
    el.classList.remove('typing-cursor');
    this.state.isTyping = false;
    // Executa o callback (mostrar botão ou escolhas)
    if (this.afterTypingCb) {
      this.afterTypingCb();
      this.afterTypingCb = null;
    }
  }

  // ─── NAVEGAÇÃO DE TELAS ──────────────────────────────────────
  showScreen(name) {
    Object.values(this.elements.screens).forEach(s => s.classList.remove('active'));
    this.elements.screens[name].classList.add('active');
  }

  startGame() {
    this.state = {
      chapter: 0,
      variables: { company: 50, trust: 50, reputation: 50, automation: 10 },
      keyDecisions: [],
      isTyping: false
    };
    this.showScreen('game');
    this.loadChapter(0);
  }

  // ─── CAPÍTULOS ───────────────────────────────────────────────
  loadChapter(chapterIndex) {
    if (chapterIndex >= STORY.chapters.length) { this.showEnding(); return; }

    this.currentChapter = STORY.chapters[chapterIndex];
    this.state.chapter  = chapterIndex;

    // HUD
    this.elements.hud.chapter.textContent    = this.currentChapter.id;
    this.elements.hud.sceneTitle.textContent = this.currentChapter.title;

    const char = CHARACTERS[this.currentChapter.character];
    this.elements.hud.character.textContent  = char.name;
    this.elements.hud.charRole.textContent   = char.role;
    this.elements.hud.charIcon.textContent   = char.icon;
    this.elements.hud.charIcon.style.color   = char.color;

    this.updateIndicators();
    this.sceneQueue  = this.currentChapter.scenes;
    this.queueIndex  = 0;
    this.playScene(this.sceneQueue[0]);
  }

  // ─── CENAS ───────────────────────────────────────────────────
  playScene(scene) {
    this.currentScene = scene;

    // Background
    this.elements.scene.bg.className = `scene-bg ${scene.bg}`;

    // Localização
    this.elements.scene.location.textContent = scene.location;

    // Speaker
    this.setSpeaker(scene.speaker);

    // Ocultar controles
    this.elements.scene.choicesPanel.style.display = 'none';
    this.elements.scene.continueBtn.style.display  = 'none';

    // Scroll ao topo do narrative-box
    const box = this.elements.scene.narrativeBox;
    if (box) box.scrollTop = 0;

    // Digitar texto
    const afterDone = () => {
      if (scene.isChoice) {
        setTimeout(() => this.showChoices(scene.choices, scene.choiceQuestion), 350);
      } else {
        this.elements.scene.continueBtn.style.display = 'block';
      }
    };

    this.typeText(scene.text, afterDone);
  }

  // ─── SPEAKER TAG ─────────────────────────────────────────────
  setSpeaker(speakerId) {
    const tag = this.elements.scene.narratorTag;
    const colorMap = {
      carlos:   { label:'CARLOS RODRIGUES', color:'#c9a84c', bg:'rgba(201,168,76,0.1)',  border:'rgba(201,168,76,0.3)'  },
      gabrielle:{ label:'GABRIELLE SILVA',  color:'#4acf7a', bg:'rgba(74,207,122,0.1)', border:'rgba(74,207,122,0.3)' },
      david:    { label:'DAVID CORREDOR',   color:'#4a9eff', bg:'rgba(74,158,255,0.1)', border:'rgba(74,158,255,0.3)' },
      manuela:  { label:'MANUELA PARESCHI', color:'#e8a030', bg:'rgba(232,160,48,0.1)', border:'rgba(232,160,48,0.3)' },
      victor:   { label:'VICTOR MORAES',   color:'#e05050', bg:'rgba(224,80,80,0.1)',  border:'rgba(224,80,80,0.3)'  },
      athena:   { label:'ATHENA — I.A.',   color:'#4a9eff', bg:'rgba(74,158,255,0.08)',border:'rgba(74,158,255,0.4)' },
      narrator: { label:'NARRADOR',        color:'#7a7870', bg:'rgba(122,120,112,0.1)',border:'rgba(122,120,112,0.25)' }
    };

    const id = speakerId || 'narrator';
    const c  = colorMap[id] || colorMap.narrator;

    tag.textContent          = c.label;
    tag.style.color          = c.color;
    tag.style.background     = c.bg;
    tag.style.borderColor    = c.border;
  }

  // ─── DIGITAÇÃO ───────────────────────────────────────────────
  typeText(text, callback) {
    const el = this.elements.scene.text;

    // Limpar estado anterior
    if (this.typingInterval) { clearInterval(this.typingInterval); this.typingInterval = null; }

    el.textContent = '';
    el.classList.add('typing-cursor');
    this.fullText      = text;
    this.afterTypingCb = callback;
    this.state.isTyping = true;

    let i = 0;
    const speed = 20; // ms por caractere

    this.typingInterval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i++];
        // Auto-scroll dentro do narrative-box enquanto digita
        const box = this.elements.scene.narrativeBox;
        if (box) box.scrollTop = box.scrollHeight;
      } else {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
        el.classList.remove('typing-cursor');
        this.state.isTyping = false;
        this.afterTypingCb  = null;
        if (callback) callback();
      }
    }, speed);
  }

  // ─── ESCOLHAS ────────────────────────────────────────────────
  showChoices(choices) {
    const panel = this.elements.scene.choicesPanel;
    const list  = this.elements.scene.choicesList;
    list.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `
        <span class="choice-letter">${letters[idx]}</span>
        <span class="choice-text">${choice.text}</span>
        ${choice.tag ? `<span class="choice-tag">${choice.tag}</span>` : ''}
      `;
      btn.onclick = () => this.makeChoice(choice);

      // Animação de entrada escalonada
      btn.style.opacity   = '0';
      btn.style.transform = 'translateX(-12px)';
      list.appendChild(btn);
      setTimeout(() => {
        btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        btn.style.opacity    = '1';
        btn.style.transform  = 'translateX(0)';
      }, idx * 90 + 50);
    });

    panel.style.display = 'block';

    // Após mostrar as escolhas, rola narrative-box para que o texto fique visível
    setTimeout(() => {
      const box = this.elements.scene.narrativeBox;
      if (box) box.scrollTop = box.scrollHeight;
    }, 80);
  }

  makeChoice(choice) {
    // Aplicar efeitos
    if (choice.effect) {
      Object.entries(choice.effect).forEach(([key, value]) => {
        this.state.variables[key] = Math.max(0, Math.min(100,
          (this.state.variables[key] || 50) + value
        ));
      });
    }
    if (choice.keyDecision) {
      this.state.keyDecisions.push({ chapter: this.currentChapter.id, text: choice.keyDecision });
    }

    this.elements.scene.choicesPanel.style.display = 'none';
    this.updateIndicators();

    if (choice.consequence) {
      this.showConsequence(choice.consequence, () => this.nextScene());
    } else {
      this.nextScene();
    }
  }

  // ─── CONTINUAR / PRÓXIMA CENA ────────────────────────────────
  continueScene() {
    this.elements.scene.continueBtn.style.display = 'none';
    this.nextScene();
  }

  nextScene() {
    this.queueIndex++;
    if (this.queueIndex < this.sceneQueue.length) {
      setTimeout(() => this.playScene(this.sceneQueue[this.queueIndex]), 280);
    } else {
      const next = this.state.chapter + 1;
      next < STORY.chapters.length ? this.showChapterTransition(next) : this.showEnding();
    }
  }

  // ─── FLASH CONSEQUÊNCIA ──────────────────────────────────────
  showConsequence(text, callback) {
    const flash  = this.elements.scene.consequenceFlash;
    const cfText = this.elements.scene.cfText;
    cfText.textContent  = text;
    flash.style.display = 'flex';
    setTimeout(() => { flash.style.display = 'none'; if (callback) callback(); }, 3500);
  }

  // ─── TRANSIÇÃO DE CAPÍTULO ───────────────────────────────────
  showChapterTransition(nextChapter) {
    const chapter = STORY.chapters[nextChapter];
    const char    = CHARACTERS[chapter.character];

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:500;
      background:#050507;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      opacity:0; transition:opacity 0.5s ease;
    `;
    overlay.innerHTML = `
      <div class="chapter-transition-inner">
        <div class="ct-label">CAPÍTULO ${chapter.id}</div>
        <div class="ct-title">${chapter.title}</div>
        <div class="ct-line"></div>
        <div class="ct-char">${char.fullName}</div>
      </div>
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      setTimeout(() => {
        const inner = overlay.querySelector('.chapter-transition-inner');
        if (inner) { inner.style.opacity = '1'; inner.style.transform = 'translateY(0)'; }
      }, 400);
    });

    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.remove(); this.loadChapter(nextChapter); }, 500);
    }, 3000);
  }

  // ─── INDICADORES HUD ─────────────────────────────────────────
  updateIndicators() {
    const v = this.state.variables;

    const setBar = (el, val, defaultColor) => {
      el.style.width = `${val}%`;
      el.style.background =
        val < 30 ? 'var(--red)' :
        val < 60 ? 'var(--amber)' : defaultColor;
    };

    setBar(this.elements.bars.company,    v.company,    'var(--blue)');
    setBar(this.elements.bars.trust,      v.trust,      'var(--green)');
    setBar(this.elements.bars.reputation, v.reputation, 'var(--amber)');
    // Automação: quanto maior, mais vermelho
    const autoEl = this.elements.bars.automation;
    autoEl.style.width      = `${v.automation}%`;
    autoEl.style.background =
      v.automation > 70 ? 'var(--red)' :
      v.automation > 40 ? 'var(--amber)' : 'var(--red)';
  }

  // ─── FINAL ───────────────────────────────────────────────────
  showEnding() {
    const vars = this.state.variables;
    let ending;

    if (vars.company < 20)                                ending = STORY.endings.corporate_collapse;
    else if (vars.automation >= 70 && vars.company >= 60) ending = STORY.endings.athena_era;
    else if (vars.automation >= 55 && vars.company >= 50) ending = STORY.endings.automation_empire;
    else if (vars.trust >= 65 && vars.automation <= 25)   ending = STORY.endings.worker_guardian;
    else                                                   ending = STORY.endings.sustainable_balance;

    const jobsLost  = Math.round(14000 * (vars.automation / 100) * 0.9);
    const jobsSaved = 14000 - jobsLost;
    const profit    = Math.round((vars.company - 50) * 4);
    const impact    = Math.round(((vars.trust + vars.reputation) / 2) - 50);

    document.getElementById('stats-ending-name').textContent  = ending.name;
    document.getElementById('stats-ending-desc').textContent  = ending.description;
    document.getElementById('stat-jobs-saved').textContent    = jobsSaved.toLocaleString('pt-BR');
    document.getElementById('stat-jobs-lost').textContent     = jobsLost.toLocaleString('pt-BR');
    document.getElementById('stat-profit').textContent        = `${profit > 0 ? '+' : ''}${profit}%`;
    document.getElementById('stat-auto').textContent          = `${Math.round(vars.automation)}%`;
    document.getElementById('stat-rep').textContent           = `${Math.round(vars.reputation)}%`;
    document.getElementById('stat-impact').textContent        = `${impact > 0 ? '+' : ''}${impact}`;

    const decList = document.getElementById('key-decisions-list');
    decList.innerHTML = '';
    this.state.keyDecisions.forEach(dec => {
      const el = document.createElement('div');
      el.className = 'decision-entry';
      el.innerHTML = `<span class="decision-chapter">CAP. ${dec.chapter}</span><span>${dec.text}</span>`;
      decList.appendChild(el);
    });

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:#050507;opacity:0;transition:opacity 0.9s ease';
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.style.opacity = '1';
      setTimeout(() => { overlay.remove(); this.showScreen('stats'); }, 900);
    }, 80);
  }

  restartGame() {
    this.state = {
      chapter: 0,
      variables: { company:50, trust:50, reputation:50, automation:10 },
      keyDecisions: [],
      isTyping: false
    };
    this.showScreen('intro');
  }
}

// Boot
const gameEngine = new GameEngine();
document.addEventListener('DOMContentLoaded', () => { gameEngine.init(); });