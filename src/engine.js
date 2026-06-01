// HUMAN ERROR — GAME ENGINE
// Motor narrativo principal

class GameEngine {
  constructor() {
    this.state = {
      chapter: 0,
      scene: 0,
      sceneStep: 0,
      variables: {
        company: 50,
        trust: 50,
        reputation: 50,
        automation: 10
      },
      keyDecisions: [],
      isTyping: false,
      currentChoiceEffect: null
    };

    this.currentChapter = null;
    this.currentScene = null;
    this.sceneQueue = [];
    this.queueIndex = 0;

    this.elements = {};
  }

  init() {
    this.elements = {
      screens: {
        intro: document.getElementById('screen-intro'),
        game: document.getElementById('screen-game'),
        stats: document.getElementById('screen-stats')
      },
      hud: {
        chapter: document.getElementById('hud-chapter'),
        character: document.getElementById('hud-character'),
        charRole: document.getElementById('hud-char-role'),
        charIcon: document.getElementById('hud-char-icon'),
        sceneTitle: document.getElementById('hud-scene-title'),
        indCompany: document.getElementById('ind-company'),
        indTrust: document.getElementById('ind-trust'),
        indReputation: document.getElementById('ind-reputation'),
        indAutomation: document.getElementById('ind-automation')
      },
      scene: {
        bg: document.getElementById('scene-bg'),
        narratorTag: document.getElementById('narrator-tag'),
        location: document.getElementById('scene-location'),
        text: document.getElementById('narrative-text'),
        continueBtn: document.getElementById('narrative-continue'),
        choicesPanel: document.getElementById('choices-panel'),
        choicesList: document.getElementById('choices-list'),
        consequenceFlash: document.getElementById('consequence-flash'),
        cfText: document.getElementById('cf-text')
      }
    };
  }

  startGame() {
    this.showScreen('game');
    this.state.chapter = 0;
    this.loadChapter(0);
  }

  showScreen(name) {
    Object.values(this.elements.screens).forEach(s => {
      s.classList.remove('active');
    });
    this.elements.screens[name].classList.add('active');
  }

  loadChapter(chapterIndex) {
    if (chapterIndex >= STORY.chapters.length) {
      this.showEnding();
      return;
    }

    this.currentChapter = STORY.chapters[chapterIndex];
    this.state.chapter = chapterIndex;

    // Atualizar HUD
    this.elements.hud.chapter.textContent = this.currentChapter.id;
    this.elements.hud.sceneTitle.textContent = this.currentChapter.title;

    const char = CHARACTERS[this.currentChapter.character];
    this.elements.hud.character.textContent = char.name;
    this.elements.hud.charRole.textContent = char.role;
    this.elements.hud.charIcon.textContent = char.icon;
    this.elements.hud.charIcon.style.color = char.color;

    this.updateIndicators();

    this.sceneQueue = this.currentChapter.scenes;
    this.queueIndex = 0;

    this.playScene(this.sceneQueue[0]);
  }

  playScene(scene) {
    this.currentScene = scene;

    // Atualizar background
    this.elements.scene.bg.className = `scene-bg ${scene.bg}`;

    // Atualizar localização
    this.elements.scene.location.textContent = scene.location;

    // Configurar speaker
    this.setSpeaker(scene.speaker);

    // Esconder painel de escolhas
    this.elements.scene.choicesPanel.style.display = 'none';

    // Mostrar ou esconder botão continuar
    if (scene.isChoice) {
      this.elements.scene.continueBtn.style.display = 'none';
    }

    // Animar texto
    this.typeText(scene.text, scene.isChoice, scene.choices, scene.choiceQuestion);
  }

  setSpeaker(speakerId) {
    if (!speakerId || speakerId === 'narrator') {
      this.elements.scene.narratorTag.textContent = 'NARRADOR';
      this.elements.scene.narratorTag.style.color = 'var(--text-muted)';
      this.elements.scene.narratorTag.style.background = 'rgba(122,120,112,0.1)';
      this.elements.scene.narratorTag.style.borderColor = 'rgba(122,120,112,0.25)';
      return;
    }

    const char = CHARACTERS[speakerId];
    if (char) {
      this.elements.scene.narratorTag.textContent = char.name;
      this.elements.scene.narratorTag.style.color = char.tagColor;
      this.elements.scene.narratorTag.style.background = `${char.tagColor.replace('var(--', '').replace(')', '')}10`;
      // Simplificar para cores diretas
      const colorMap = {
        'carlos': 'rgba(201,168,76,0.1)',
        'gabrielle': 'rgba(74,207,122,0.1)',
        'david': 'rgba(74,158,255,0.1)',
        'manuela': 'rgba(232,160,48,0.1)',
        'victor': 'rgba(224,80,80,0.1)',
        'athena': 'rgba(74,158,255,0.1)',
        'narrator': 'rgba(122,120,112,0.1)'
      };
      this.elements.scene.narratorTag.style.background = colorMap[speakerId] || 'rgba(201,168,76,0.1)';
      this.elements.scene.narratorTag.style.borderColor = char.color + '40';
    }
  }

  typeText(text, isChoice, choices, question) {
    const el = this.elements.scene.text;
    el.innerHTML = '';
    el.classList.add('typing-cursor');
    this.state.isTyping = true;

    // Processar formatação do texto
    let processedText = text;

    // Verificar se é diálogo
    if (this.currentScene && this.currentScene.type === 'dialogue' && this.currentScene.speaker && this.currentScene.speaker !== 'narrator') {
      const char = CHARACTERS[this.currentScene.speaker];
      if (char) {
        processedText = `<span class="dialogue">${text}</span>`;
      }
    }

    const fullText = processedText;
    let i = 0;
    const speed = 22;

    // Para textos longos com HTML, usar abordagem diferente
    const isHTML = fullText.includes('<');

    if (isHTML) {
      el.innerHTML = fullText;
      el.classList.remove('typing-cursor');
      this.state.isTyping = false;

      if (!isChoice) {
        this.elements.scene.continueBtn.style.display = 'block';
      } else {
        setTimeout(() => {
          this.showChoices(choices, question);
        }, 400);
      }
      return;
    }

    const interval = setInterval(() => {
      if (i < fullText.length) {
        el.textContent += fullText[i];
        i++;
      } else {
        clearInterval(interval);
        el.classList.remove('typing-cursor');
        this.state.isTyping = false;

        if (!isChoice) {
          this.elements.scene.continueBtn.style.display = 'block';
        } else {
          setTimeout(() => {
            this.showChoices(choices, question);
          }, 400);
        }
      }
    }, speed);
  }

  showChoices(choices, question) {
    const panel = this.elements.scene.choicesPanel;
    const list = this.elements.scene.choicesList;

    panel.style.display = 'block';
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
      list.appendChild(btn);

      // Animar entrada
      btn.style.opacity = '0';
      btn.style.transform = 'translateX(-10px)';
      setTimeout(() => {
        btn.style.transition = 'all 0.3s ease';
        btn.style.opacity = '1';
        btn.style.transform = 'translateX(0)';
      }, idx * 100);
    });
  }

  makeChoice(choice) {
    // Aplicar efeitos às variáveis
    if (choice.effect) {
      Object.entries(choice.effect).forEach(([key, value]) => {
        this.state.variables[key] = Math.max(0, Math.min(100, (this.state.variables[key] || 50) + value));
      });
    }

    // Registrar decisão importante
    if (choice.keyDecision) {
      this.state.keyDecisions.push({
        chapter: this.currentChapter.id,
        text: choice.keyDecision
      });
    }

    // Esconder painel de escolhas
    this.elements.scene.choicesPanel.style.display = 'none';

    // Atualizar indicadores
    this.updateIndicators();

    // Mostrar consequência se existir
    if (choice.consequence) {
      this.showConsequence(choice.consequence, () => {
        this.nextScene();
      });
    } else {
      this.nextScene();
    }
  }

  showConsequence(text, callback) {
    const flash = this.elements.scene.consequenceFlash;
    const cfText = this.elements.scene.cfText;

    cfText.textContent = text;
    flash.style.display = 'flex';

    setTimeout(() => {
      flash.style.display = 'none';
      if (callback) callback();
    }, 3500);
  }

  continueScene() {
    this.elements.scene.continueBtn.style.display = 'none';
    this.nextScene();
  }

  nextScene() {
    this.queueIndex++;

    if (this.queueIndex < this.sceneQueue.length) {
      // Próxima cena no mesmo capítulo
      setTimeout(() => {
        this.playScene(this.sceneQueue[this.queueIndex]);
      }, 300);
    } else {
      // Próximo capítulo
      const nextChapter = this.state.chapter + 1;
      if (nextChapter < STORY.chapters.length) {
        this.showChapterTransition(nextChapter);
      } else {
        this.showEnding();
      }
    }
  }

  showChapterTransition(nextChapter) {
    const chapter = STORY.chapters[nextChapter];

    // Fade para preto
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 500;
      background: #050507;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.6s ease;
    `;

    overlay.innerHTML = `
      <div style="text-align:center; animation: fadeUp 0.8s 0.4s ease both; opacity: 0; transform: translateY(20px);">
        <div style="font-family: 'Share Tech Mono', monospace; font-size: 0.65rem; letter-spacing: 0.4em; color: #4a4840; margin-bottom: 1rem;">CAPÍTULO ${chapter.id}</div>
        <div style="font-family: 'Cinzel', serif; font-size: 2rem; color: #c9a84c; letter-spacing: 0.1em;">${chapter.title}</div>
        <div style="width: 60px; height: 1px; background: rgba(201,168,76,0.3); margin: 1.5rem auto;"></div>
        <div style="font-family: 'Crimson Pro', serif; font-size: 0.9rem; font-style: italic; color: #4a4840;">${CHARACTERS[chapter.character].fullName}</div>
      </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => { overlay.style.opacity = '1'; }, 50);

    // Animar texto interno
    setTimeout(() => {
      const inner = overlay.querySelector('div > div');
      if (inner) {
        inner.style.animation = 'none';
        inner.style.opacity = '1';
        inner.style.transform = 'translateY(0)';
        inner.style.transition = 'all 0.8s ease';
      }
    }, 500);

    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        this.loadChapter(nextChapter);
      }, 600);
    }, 3000);
  }

  updateIndicators() {
    const vars = this.state.variables;

    this.elements.hud.indCompany.style.width = `${vars.company}%`;
    this.elements.hud.indTrust.style.width = `${vars.trust}%`;
    this.elements.hud.indReputation.style.width = `${vars.reputation}%`;
    this.elements.hud.indAutomation.style.width = `${vars.automation}%`;

    // Cores dinâmicas baseadas em valores
    const companyEl = this.elements.hud.indCompany;
    if (vars.company < 30) companyEl.style.background = 'var(--red)';
    else if (vars.company < 60) companyEl.style.background = 'var(--amber)';
    else companyEl.style.background = 'var(--blue)';

    const trustEl = this.elements.hud.indTrust;
    if (vars.trust < 30) trustEl.style.background = 'var(--red)';
    else if (vars.trust < 60) trustEl.style.background = 'var(--amber)';
    else trustEl.style.background = 'var(--green)';
  }

  showEnding() {
    const vars = this.state.variables;

    // Determinar qual final
    let ending;

    if (vars.company < 0 || vars.company < 20) {
      ending = STORY.endings.corporate_collapse;
    } else if (vars.automation >= 70 && vars.company >= 60) {
      ending = STORY.endings.athena_era;
    } else if (vars.automation >= 55 && vars.company >= 50) {
      ending = STORY.endings.automation_empire;
    } else if (vars.trust >= 65 && vars.automation <= 25) {
      ending = STORY.endings.worker_guardian;
    } else {
      ending = STORY.endings.sustainable_balance;
    }

    // Calcular estatísticas finais
    const automation = vars.automation;
    const trust = vars.trust;
    const company = vars.company;
    const reputation = vars.reputation;

    const totalWorkers = 14000;
    const jobsLost = Math.round(totalWorkers * (automation / 100) * 0.9);
    const jobsSaved = totalWorkers - jobsLost;
    const profit = Math.round((company - 50) * 4);
    const socialImpact = Math.round(((trust + reputation) / 2) - 50);

    // Preencher tela de stats
    document.getElementById('stats-ending-name').textContent = ending.name;
    document.getElementById('stats-ending-desc').textContent = ending.description;
    document.getElementById('stat-jobs-saved').textContent = jobsSaved.toLocaleString('pt-BR');
    document.getElementById('stat-jobs-lost').textContent = jobsLost.toLocaleString('pt-BR');
    document.getElementById('stat-profit').textContent = `${profit > 0 ? '+' : ''}${profit}%`;
    document.getElementById('stat-auto').textContent = `${Math.round(automation)}%`;
    document.getElementById('stat-rep').textContent = `${Math.round(reputation)}%`;
    document.getElementById('stat-impact').textContent = `${socialImpact > 0 ? '+' : ''}${socialImpact}`;

    // Decisões chave
    const decList = document.getElementById('key-decisions-list');
    decList.innerHTML = '';
    this.state.keyDecisions.forEach(dec => {
      const el = document.createElement('div');
      el.className = 'decision-entry';
      el.innerHTML = `
        <span class="decision-chapter">CAP. ${dec.chapter}</span>
        <span>${dec.text}</span>
      `;
      decList.appendChild(el);
    });

    // Transição para tela de stats
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 500;
      background: #050507;
      opacity: 0; transition: opacity 1s ease;
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = '1';
      setTimeout(() => {
        overlay.remove();
        this.showScreen('stats');
      }, 1000);
    }, 100);
  }

  restartGame() {
    this.state = {
      chapter: 0,
      scene: 0,
      sceneStep: 0,
      variables: {
        company: 50,
        trust: 50,
        reputation: 50,
        automation: 10
      },
      keyDecisions: [],
      isTyping: false
    };

    this.showScreen('intro');
  }
}

// Inicializar
const gameEngine = new GameEngine();
document.addEventListener('DOMContentLoaded', () => {
  gameEngine.init();
});
