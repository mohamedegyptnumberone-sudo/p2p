(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  // ---------- STORAGE (localStorage) ----------
  const storage = {
    get(key, fallback = null) {
      try {
        const v = localStorage.getItem('p2p_' + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('p2p_' + key, JSON.stringify(value)); } catch (e) {}
    },
    remove(key) {
      try { localStorage.removeItem('p2p_' + key); } catch (e) {}
    }
  };

  // ---------- DOM ----------
  const myNumberEl   = $('myNumberEl');
  const myNumberText = $('myNumberText');
  const myNameEl     = $('myName');
  const myAvatarEl   = $('myAvatar');
  const headerLeft   = $('headerLeft');
  const tabs         = document.querySelectorAll('.tab');
  const panels       = document.querySelectorAll('.panel');
  const chatBadge    = $('chatBadge');
  const settingsBtn  = $('settingsBtn');
  const peerStripDot   = $('peerStripDot');
  const peerStripLabel = $('peerStripLabel');
  const peerStripName  = $('peerStripName');
  const setupOverlay   = $('setupOverlay');
  const setupDoneBtn   = $('setupDoneBtn');
  const settingsOverlay = $('settingsOverlay');
  const settingsCloseBtn = $('settingsCloseBtn');
  const settingSound = $('settingSound');
  const settingNotif = $('settingNotif');
  const settingsIdText = $('settingsIdText');
  const copyIdBtn = $('copyIdBtn');

  const profileOverlay      = $('profileOverlay');
  const profileTitle        = $('profileTitle');
  const profilePreview      = $('profilePreview');
  const profilePictureInput = $('profilePictureInput');
  const profileNameInput    = $('profileNameInput');
  const profileSaveBtn      = $('profileSaveBtn');
  const profileCancelBtn    = $('profileCancelBtn');
  const saveChatOverlay = $('saveChatOverlay');
  const saveChatYesBtn  = $('saveChatYesBtn');
  const saveChatNoBtn   = $('saveChatNoBtn');
  const saveContactOverlay    = $('saveContactOverlay');
  const saveContactPreview    = $('saveContactPreview');
  const saveContactName       = $('saveContactName');
  const saveContactNumber     = $('saveContactNumber');
  const saveContactConfirmBtn = $('saveContactConfirmBtn');
  const saveContactCancelBtn  = $('saveContactCancelBtn');

  const peerNumberInput = $('peerNumberInput');
  const callNowBtn      = $('callNowBtn');
  const videoCallBtn    = $('videoCallBtn');
  const dialPad         = $('dialPad');
  const activeCallPanel = $('activeCallPanel');
  const callAvatar      = $('callAvatar');
  const callNameDisp    = $('callNameDisplay');
  const callNumberDisp  = $('callNumberDisplay');
  const callStateText   = $('callStateText');
  const muteCallBtn     = $('muteCallBtn');
  const hangupCallBtn   = $('hangupCallBtn');
  const voiceToVideoBtn = $('voiceToVideoBtn');
  const contactsList    = $('contactsList');
  const contactCount    = $('contactCount');
  const videoCallContainer = $('videoCallContainer');
  const localVideo         = $('localVideo');
  const remoteVideo        = $('remoteVideo');
  const localVideoLabel    = $('localVideoLabel');
  const remoteVideoLabel   = $('remoteVideoLabel');
  const videoMuteBtn       = $('videoMuteBtn');
  const videoToggleBtn     = $('videoToggleBtn');
  const videoHangupBtn     = $('videoHangupBtn');
  const incomingOverlay = $('incomingOverlay');
  const incomingNumber  = $('incomingNumber');
  const incomingName    = $('incomingName');
  const incomingType    = $('incomingType');
  const incomingAvatar  = $('incomingAvatar');
  const acceptCallBtn   = $('acceptCallBtn');
  const rejectCallBtn   = $('rejectCallBtn');

  const messages         = $('messages');
  const chatInput        = $('chatInput');
  const recordBtn        = $('recordBtn');
  const sendBtn          = $('sendBtn');
  const attachBtn        = $('attachBtn');
  const attachMenu       = $('attachMenu');
  const bgPickerBtn      = $('bgPickerBtn');
  const bgSwatches       = $('bgSwatches');
  const dateBtn          = $('dateBtn');
  const calcBtn          = $('calcBtn');
  const datePickerPopup  = $('datePickerPopup');
  const dateInputField   = $('dateInputField');
  const timeInputField   = $('timeInputField');
  const sendDateBtn      = $('sendDateBtn');
  const replyPreview     = $('replyPreview');
  const replyPreviewAuthor = $('replyPreviewAuthor');
  const replyPreviewText   = $('replyPreviewText');
  const replyPreviewClose  = $('replyPreviewClose');
  const contactSearchInput = $('contactSearchInput');
  const typingIndicator = $('typingIndicator');
  const typingLabel     = $('typingLabel');
  const calcOverlay = $('calcOverlay');
  const calcDisplay = $('calcDisplay');
  const calcGrid    = $('calcGrid');
  const calcCloseBtn= $('calcCloseBtn');
  const gameInviteOverlay = $('gameInviteOverlay');
  const gameInviteAvatar  = $('gameInviteAvatar');
  const gameInviteName    = $('gameInviteName');
  const gameInviteYesBtn  = $('gameInviteYesBtn');
  const gameInviteNoBtn   = $('gameInviteNoBtn');
  const fileInput  = $('fileInput');
  const imageInput = $('imageInput');
  const videoInput = $('videoInput');
  const audioInput = $('audioInput');
  const boardEl      = $('board');
  const gameStatusEl = $('gameStatus');
  const resetGameBtn = $('resetGameBtn');
  const pcAvatarMe   = $('pcAvatarMe');
  const pcNameMe     = $('pcNameMe');
  const pcSymbolMe   = $('pcSymbolMe');
  const pcWinsMe     = $('pcWinsMe');
  const pcAvatarPeer = $('pcAvatarPeer');
  const pcNamePeer   = $('pcNamePeer');
  const pcSymbolPeer = $('pcSymbolPeer');
  const pcWinsPeer   = $('pcWinsPeer');
  const dot        = $('dot');
  const statusText = $('statusText');
  const toastEl    = $('toast');

  // ---------- STATE ----------
  let peer = null;
  let dataConn = null;
  let mediaCall = null;
  let localStream = null;
  let remoteStream = null;
  let audioEl = null;
  let myNumber = null;
  let peerNumber = null;
  let peerProfile = null;
  let myProfile = { name: 'Anonymous', avatar: null };
  let callState = 'idle';
  let callType = 'voice';
  let isMuted = false;
  let isVideoEnabled = false;
  let isRecording = false;
  let mediaRecorder = null;
  let recordedChunks = [];
  let ringtoneCtx = null;
  let ringtoneTimer = null;
  let chatUnread = false;
  const CHUNK_SIZE = 16 * 1024;
  let incomingFiles = {};
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameActive = true;
  let gameWinner = null;
  let mySymbol = 'X';
  let peerSymbol = 'O';
  let round = 1;
  let myScore = 0;
  let peerScore = 0;
  let myTotalWins = 0;
  let peerTotalWins = 0;
  let contacts = [];
  let contactFilter = '';
  let peerPresence = null;
  let replyingTo = null;
  let pendingInviteRound = null;
  let awaitingInviteReply = false;
  let calc = { display: '0', prev: null, op: null, waitingForNew: false };
  let lastSeenMap = {};
  let presenceTickInterval = null;
  let typingSentAt = 0;
  let typingHideTimer = null;
  let peerTyping = false;
  let currentSettings = { soundEnabled: true, notificationsEnabled: true };

  const ICE_SERVERS = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
    { urls: 'turn:openrelay.metered.ca:80',  username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turns:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' }
  ];

  // ---------- UTILS ----------
  const setStatus = (text, cls = '') => {
    statusText.textContent = text;
    dot.className = 'dot ' + cls;
  };
  const showToast = (text, duration = 2500) => {
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove('show'), duration);
  };
  const generateNumber = () => String(Math.floor(1000 + Math.random() * 9000));
  const switchTab = (name) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + name));
    if (name === 'chat') {
      chatUnread = false;
      chatBadge.classList.add('hidden');
      setTimeout(checkSeenVisible, 60);
    }
  };
  tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const escapeAttr = (s) => String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const linkify = (text) => {
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (i % 2 === 1) return `<a href="${escapeAttr(part)}" target="_blank" rel="noopener noreferrer">${escapeHtml(part)}</a>`;
      return escapeHtml(part);
    }).join('');
  };
  const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };
  const formatTime = (ts) => {
    const d = ts ? new Date(ts) : new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const getInitials = (name) => {
    if (!name) return '?';
    return name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };
  const formatLastSeen = (ts) => {
    if (!ts) return 'Offline';
    const diff = Date.now() - ts;
    if (diff < 15 * 1000)  return 'Last seen just now';
    if (diff < 60 * 1000)  return `Last seen ${Math.floor(diff / 1000)}s ago`;
    if (diff < 60 * 60 * 1000) return `Last seen ${Math.floor(diff / 60000)}m ago`;
    if (diff < 24 * 60 * 60 * 1000) return `Last seen ${Math.floor(diff / 3600000)}h ago`;
    if (diff < 7 * 24 * 60 * 60 * 1000) return `Last seen ${Math.floor(diff / 86400000)}d ago`;
    const d = new Date(ts);
    return `Last seen ${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}`;
  };
  const computePeerPresence = () => {
    if (dataConn && dataConn.open) {
      if (peerPresence === 'away') return { cls: 'away', label: 'Away' };
      return { cls: 'online', label: 'Active now' };
    }
    const ls = peerNumber ? lastSeenMap[peerNumber] : null;
    return { cls: 'offline', label: ls ? formatLastSeen(ls) : 'Offline' };
  };
  const saveLastSeenMap = () => storage.set('last_seen_map', lastSeenMap);

  // ---------- PERSISTENCE ----------
  const loadProfile = () => {
    const p = storage.get('profile', null);
    if (p && typeof p.name === 'string') myProfile = p;
  };
  const saveProfile = () => storage.set('profile', myProfile);
  const loadContacts = () => { contacts = storage.get('contacts', []) || []; renderContacts(); };
  const saveContacts = () => storage.set('contacts', contacts);
  const loadWinCount = () => {
    myTotalWins = parseInt(storage.get('my_wins', '0'), 10) || 0;
    updateGamePlayerCards();
  };
  const saveWinCount = () => storage.set('my_wins', String(myTotalWins));
  const loadChatBg = () => {
    const bg = storage.get('chat_bg', '#F6F3ED');
    messages.style.background = bg;
    messages.dataset.bg = bg;
    document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.bg === bg));
  };
  const saveChatBg = (bg) => storage.set('chat_bg', bg);
  const loadLastSeen = () => { lastSeenMap = storage.get('last_seen_map', {}) || {}; };

  // ---------- SETTINGS ----------
  const loadSettings = () => {
    const s = storage.get('settings', null);
    if (s) currentSettings = Object.assign(currentSettings, s);
    settingSound.checked = currentSettings.soundEnabled;
    settingNotif.checked = currentSettings.notificationsEnabled;
  };
  const persistSettings = () => {
    currentSettings = {
      soundEnabled: settingSound.checked,
      notificationsEnabled: settingNotif.checked
    };
    storage.set('settings', currentSettings);
  };
  settingSound.addEventListener('change', persistSettings);
  settingNotif.addEventListener('change', persistSettings);

  settingsBtn.addEventListener('click', () => {
    settingsIdText.textContent = myNumber || '—';
    settingsOverlay.classList.add('active');
  });
  settingsCloseBtn.addEventListener('click', () => settingsOverlay.classList.remove('active'));
  copyIdBtn.addEventListener('click', () => {
    navigator.clipboard?.writeText(myNumber).then(() => showToast('ID copied'));
  });
  setupDoneBtn.addEventListener('click', () => {
    setupOverlay.classList.remove('active');
    storage.set('setup_seen', true);
  });

  // ---------- PROFILE ----------
  const renderMyProfile = () => {
    myNameEl.textContent = myProfile.name || 'Anonymous';
    if (myProfile.avatar) myAvatarEl.innerHTML = `<img src="${escapeAttr(myProfile.avatar)}" alt="">`;
    else myAvatarEl.textContent = getInitials(myProfile.name);
    updateGamePlayerCards();
  };
  const openProfileModal = (isFirstTime = false) => {
    profileTitle.textContent = isFirstTime ? 'Set up your profile' : 'Edit profile';
    profileNameInput.value = myProfile.name === 'Anonymous' ? '' : myProfile.name;
    if (myProfile.avatar) profilePreview.innerHTML = `<img src="${escapeAttr(myProfile.avatar)}" alt="">`;
    else profilePreview.textContent = getInitials(myProfile.name);
    profileCancelBtn.style.display = isFirstTime ? 'none' : 'block';
    profileOverlay.classList.add('active');
    setTimeout(() => profileNameInput.focus(), 100);
  };
  const closeProfileModal = () => profileOverlay.classList.remove('active');
  let pendingAvatar = undefined;
  profilePreview.addEventListener('click', () => profilePictureInput.click());
  profilePictureInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      pendingAvatar = reader.result;
      profilePreview.innerHTML = `<img src="${escapeAttr(pendingAvatar)}" alt="">`;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });
  profileSaveBtn.addEventListener('click', () => {
    const name = profileNameInput.value.trim() || 'Anonymous';
    myProfile.name = name;
    if (pendingAvatar !== undefined) myProfile.avatar = pendingAvatar;
    pendingAvatar = undefined;
    saveProfile();
    renderMyProfile();
    closeProfileModal();
    showToast('Profile saved');
    if (dataConn && dataConn.open) {
      sendData({ type: 'profile', name: myProfile.name, avatar: myProfile.avatar, number: myNumber, wins: myTotalWins });
    }
  });
  profileCancelBtn.addEventListener('click', closeProfileModal);
  headerLeft.addEventListener('click', () => openProfileModal(false));

  // ---------- CONTACTS ----------
  const addOrUpdateContact = (number, name, avatar) => {
    if (!number) return;
    const existing = contacts.find(c => c.number === number);
    if (existing) {
      existing.name = name || existing.name;
      existing.avatar = avatar !== undefined ? avatar : existing.avatar;
    } else {
      contacts.push({ number, name: name || 'Unknown', avatar: avatar || null });
    }
    saveContacts();
    renderContacts();
  };
  const removeContact = (number) => {
    contacts = contacts.filter(c => c.number !== number);
    saveContacts();
    renderContacts();
  };
  const renderContacts = () => {
    contactCount.textContent = contacts.length;
    const q = contactFilter.trim().toLowerCase();
    const list = q ? contacts.filter(c =>
      (c.name || '').toLowerCase().includes(q) || String(c.number).includes(q)) : contacts;
    if (contacts.length === 0) {
      contactsList.innerHTML = '<div class="empty-contacts">No saved contacts yet.</div>';
      return;
    }
    if (list.length === 0) {
      contactsList.innerHTML = '<div class="empty-contacts">No matches.</div>';
      return;
    }
    contactsList.innerHTML = '';
    list.forEach(c => {
      const item = document.createElement('div');
      item.className = 'contact-item';
      const avWrap = document.createElement('div');
      avWrap.className = 'contact-avatar-wrap';
      const av = document.createElement('div');
      av.className = 'contact-avatar';
      if (c.avatar) av.innerHTML = `<img src="${escapeAttr(c.avatar)}" alt="">`;
      else av.textContent = getInitials(c.name);
      avWrap.appendChild(av);
      const isOnlineNow = dataConn && dataConn.open && peerNumber === c.number;
      if (isOnlineNow) {
        const dotEl = document.createElement('span');
        dotEl.className = 'status-indicator ' + (peerPresence === 'away' ? 'away' : 'online');
        avWrap.appendChild(dotEl);
      }
      const info = document.createElement('div');
      info.className = 'contact-info';
      const nm = document.createElement('div');
      nm.className = 'contact-name';
      nm.textContent = c.name;
      const num = document.createElement('div');
      num.className = 'contact-number';
      const ls = lastSeenMap[c.number];
      const pres = isOnlineNow
        ? (peerPresence === 'away' ? 'Away' : 'Active now')
        : (ls ? formatLastSeen(ls) : 'Offline');
      num.innerHTML = `#${escapeHtml(c.number)} · <span class="lastseen">${escapeHtml(pres)}</span>`;
      info.appendChild(nm);
      info.appendChild(num);
      const actions = document.createElement('div');
      actions.className = 'contact-actions';
      const callBtn = document.createElement('button');
      callBtn.className = 'call'; callBtn.title = 'Voice call'; callBtn.textContent = '📞';
      callBtn.addEventListener('click', (e) => { e.stopPropagation(); makeCall(c.number, 'voice'); });
      const videoBtn = document.createElement('button');
      videoBtn.className = 'video'; videoBtn.title = 'Video call'; videoBtn.textContent = '📹';
      videoBtn.addEventListener('click', (e) => { e.stopPropagation(); makeCall(c.number, 'video'); });
      const delBtn = document.createElement('button');
      delBtn.className = 'del'; delBtn.title = 'Remove'; delBtn.textContent = '✕';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Remove ${c.name}?`)) removeContact(c.number);
      });
      actions.appendChild(callBtn);
      actions.appendChild(videoBtn);
      actions.appendChild(delBtn);
      item.appendChild(avWrap);
      item.appendChild(info);
      item.appendChild(actions);
      item.addEventListener('click', () => {
        peerNumberInput.value = c.number;
        showToast(`${c.name} ready`);
      });
      contactsList.appendChild(item);
    });
  };
  contactSearchInput.addEventListener('input', () => {
    contactFilter = contactSearchInput.value;
    renderContacts();
  });
  const openSaveContactModal = (number, name, avatar) => {
    saveContactNumber.textContent = '#' + number;
    saveContactName.textContent = name || 'Unknown';
    if (avatar) saveContactPreview.innerHTML = `<img src="${escapeAttr(avatar)}" alt="">`;
    else saveContactPreview.textContent = getInitials(name || '?');
    saveContactOverlay.classList.add('active');
    saveContactOverlay._pending = { number, name, avatar };
  };
  saveContactConfirmBtn.addEventListener('click', () => {
    const p = saveContactOverlay._pending;
    if (p) { addOrUpdateContact(p.number, p.name, p.avatar); showToast(`${p.name} saved`); }
    saveContactOverlay.classList.remove('active');
    saveContactOverlay._pending = null;
  });
  saveContactCancelBtn.addEventListener('click', () => {
    saveContactOverlay.classList.remove('active');
    saveContactOverlay._pending = null;
  });

  // ---------- MEDIA ----------
  const getMic = async () => {
    if (localStream && localStream.getAudioTracks().length) return localStream;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      video: false
    });
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    localStream = stream;
    return localStream;
  };
  const getMicAndCam = async () => {
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
    });
    localStream = stream;
    localVideo.srcObject = stream;
    localVideo.muted = true;
    localVideo.play().catch(() => {});
    return localStream;
  };

  // ---------- RINGTONE ----------
  const ensureAudioEl = () => {
    if (!audioEl) {
      audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      audioEl.playsInline = true;
      audioEl.setAttribute('playsinline', '');
      document.body.appendChild(audioEl);
    }
    return audioEl;
  };
  const playRemoteStream = (stream) => {
    const el = ensureAudioEl();
    el.srcObject = stream;
    el.play().catch(err => console.warn('Remote audio blocked:', err));
  };
  const startRingtone = () => {
    if (!currentSettings.soundEnabled) return;
    stopRingtone();
    try {
      ringtoneCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playBeep = () => {
        if (!ringtoneCtx) return;
        const osc = ringtoneCtx.createOscillator();
        const gain = ringtoneCtx.createGain();
        osc.connect(gain); gain.connect(ringtoneCtx.destination);
        osc.frequency.value = 880; osc.type = 'sine';
        gain.gain.setValueAtTime(0.0001, ringtoneCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.3, ringtoneCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ringtoneCtx.currentTime + 0.4);
        osc.start(); osc.stop(ringtoneCtx.currentTime + 0.5);
      };
      playBeep();
      ringtoneTimer = setInterval(playBeep, 900);
    } catch (e) {}
  };
  const stopRingtone = () => {
    if (ringtoneTimer) { clearInterval(ringtoneTimer); ringtoneTimer = null; }
    if (ringtoneCtx) { try { ringtoneCtx.close(); } catch (e) {} ringtoneCtx = null; }
  };

  // ---------- DATA ----------
  const sendData = (obj) => {
    if (dataConn && dataConn.open) { dataConn.send(JSON.stringify(obj)); return true; }
    return false;
  };
  const sendBinary = (buf) => {
    if (dataConn && dataConn.open) { dataConn.send(buf); return true; }
    return false;
  };
  const handleIncomingData = (raw) => {
    if (raw instanceof ArrayBuffer || raw instanceof Uint8Array) { handleFileChunk(raw); return; }
    let msg;
    try { msg = JSON.parse(raw); } catch (e) { return; }
    switch (msg.type) {
      case 'profile':
        peerProfile = { name: msg.name, avatar: msg.avatar, number: msg.number };
        peerTotalWins = msg.wins || 0;
        updatePeerInfo();
        updateGamePlayerCards();
        if (msg.number && msg.number !== myNumber && !contacts.find(c => c.number === msg.number)) {
          setTimeout(() => openSaveContactModal(msg.number, msg.name, msg.avatar), 800);
        }
        break;
      case 'chat':
        addChatMessage(msg.text, false, msg.time, peerProfile, { replyTo: msg.replyTo, kind: msg.kind, msgId: msg.msgId });
        markChatUnread();
        checkSeenVisible();
        showPeerTyping(false);
        if (msg.kind !== 'date' && currentSettings.notificationsEnabled) browserNotify('New message', `${peerProfile?.name || 'Peer'}: ${msg.text.slice(0, 60)}`);
        break;
      case 'presence':
        peerPresence = msg.state === 'away' ? 'away' : 'active';
        if (peerNumber) {
          lastSeenMap[peerNumber] = (msg.state === 'away' && msg.time) ? msg.time : Date.now();
          saveLastSeenMap();
        }
        updatePeerInfo();
        renderContacts();
        break;
      case 'typing': showPeerTyping(!!msg.on); break;
      case 'seen': markMessageSeen(msg.msgId); break;
      case 'game-invite':
        pendingInviteRound = msg.round || (round + 1);
        gameInviteName.textContent = peerProfile?.name || 'Peer';
        if (peerProfile?.avatar) gameInviteAvatar.innerHTML = `<img src="${escapeAttr(peerProfile.avatar)}" alt="">`;
        else gameInviteAvatar.textContent = '🎮';
        gameInviteOverlay.classList.add('active');
        break;
      case 'game-invite-accept':
        awaitingInviteReply = false;
        startNewRound(msg.round || (round + 1));
        addSystemMessage(`Peer accepted — round ${round} started.`);
        break;
      case 'game-invite-decline':
        awaitingInviteReply = false;
        resetGameBtn.disabled = !(dataConn && dataConn.open);
        gameStatusEl.textContent = `${currentPlayer === mySymbol ? 'Your' : "Peer's"} turn (${currentPlayer})`;
        showToast("Peer doesn't want to play right now");
        break;
      case 'audio': {
        const blob = base64ToBlob(msg.data, msg.mime);
        const url = URL.createObjectURL(blob);
        addAudioMessage(url, false, msg.time, peerProfile, msg.id);
        markChatUnread();
        checkSeenVisible();
        break;
      }
      case 'reaction': addReactionToMessage(msg.msgId, msg.emoji, true); break;
      case 'call-request':
        peerNumber = msg.from;
        callType = msg.callType || 'voice';
        if (msg.profile) { peerProfile = msg.profile; updatePeerInfo(); }
        showIncomingCall(msg.from, callType, msg.profile);
        break;
      case 'call-accept':
        if (callState === 'calling') {
          stopRingtone(); setCallState('in-call'); callStateText.textContent = 'Connected';
          startVoiceCall(msg.callType || callType);
        }
        break;
      case 'call-reject':
        stopRingtone(); showToast('Call rejected'); setCallState('idle'); hideActiveCall();
        break;
      case 'call-hangup':
        stopRingtone(); endCall(false); showToast('Peer hung up');
        break;
      case 'video-on': enableVideoMode(true); break;
      case 'video-off': enableVideoMode(false); break;
      case 'file-start':
        incomingFiles[msg.id] = { meta: msg, chunks: [], received: 0, startTime: Date.now() };
        addSystemMessage(`Receiving ${msg.name} (${formatBytes(msg.size)})…`);
        break;
      case 'file-end': {
        const f = incomingFiles[msg.id];
        if (!f) break;
        const blob = new Blob(f.chunks, { type: f.meta.mime || 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        addFileMessage(url, f.meta.name, f.meta.size, f.meta.mime, false, msg.time, peerProfile, msg.id);
        addSystemMessage(`Received ${f.meta.name}`);
        delete incomingFiles[msg.id];
        markChatUnread();
        checkSeenVisible();
        break;
      }
      case 'move':
        if (msg.symbol === peerSymbol && gameActive && !gameWinner && !board[msg.index]) makeMove(msg.index, msg.symbol);
        break;
      case 'reset':
        board = Array(9).fill(null); currentPlayer = 'X'; gameActive = true; gameWinner = null;
        round = msg.round || round; renderBoard();
        break;
      case 'wins-update':
        peerTotalWins = msg.wins || peerTotalWins;
        updateGamePlayerCards();
        break;
    }
  };
  const markChatUnread = () => {
    if (!document.getElementById('panel-chat').classList.contains('active')) {
      chatUnread = true;
      chatBadge.classList.remove('hidden');
    }
  };
  const updatePeerInfo = () => {
    const name = peerProfile?.name || (peerNumber ? ('#' + peerNumber) : '');
    if (!name) {
      peerStripLabel.textContent = 'Offline';
      peerStripLabel.className = 'presence-label offline';
      peerStripDot.className = 'status-dot offline';
      peerStripName.textContent = '';
      return;
    }
    const pres = computePeerPresence();
    peerStripLabel.textContent = pres.label;
    peerStripLabel.className = 'presence-label ' + pres.cls;
    peerStripDot.className = 'status-dot ' + pres.cls;
    peerStripName.textContent = name;
    if (settingsOverlay.classList.contains('active')) settingsIdText.textContent = myNumber || '—';
  };
  const sendPresence = (state) => {
    if (dataConn && dataConn.open) sendData({ type: 'presence', state, time: Date.now() });
  };
  document.addEventListener('visibilitychange', () => sendPresence(document.hidden ? 'away' : 'active'));
  window.addEventListener('blur',  () => sendPresence('away'));
  window.addEventListener('focus', () => sendPresence('active'));

  const showPeerTyping = (on) => {
    peerTyping = on;
    if (on) {
      typingLabel.textContent = `${peerProfile?.name || 'Peer'} is typing…`;
      typingIndicator.classList.add('visible');
      clearTimeout(typingHideTimer);
      typingHideTimer = setTimeout(() => {
        typingIndicator.classList.remove('visible');
        peerTyping = false;
      }, 3000);
    } else {
      typingIndicator.classList.remove('visible');
      peerTyping = false;
      clearTimeout(typingHideTimer);
    }
  };
  const notifyTyping = () => {
    if (!dataConn || !dataConn.open) return;
    const now = Date.now();
    if (now - typingSentAt > 1200) {
      sendData({ type: 'typing', on: true });
      typingSentAt = now;
    }
    clearTimeout(notifyTyping._offTimer);
    notifyTyping._offTimer = setTimeout(() => {
      sendData({ type: 'typing', on: false });
      typingSentAt = 0;
    }, 1800);
  };
  const handleFileChunk = (raw) => {
    const ids = Object.keys(incomingFiles);
    if (ids.length === 0) return;
    const id = ids[0];
    const f = incomingFiles[id];
    if (!f) return;
    let buf;
    if (raw instanceof ArrayBuffer) buf = new Uint8Array(raw);
    else if (raw instanceof Uint8Array) buf = raw;
    else return;
    f.chunks.push(buf);
    f.received += buf.byteLength;
    const p = document.querySelector(`[data-progress-id="${id}"]`);
    if (p) {
      const pct = Math.min(100, (f.received / f.meta.size) * 100);
      const fill = p.querySelector('.progress-fill');
      const txt = p.querySelector('.progress-text');
      if (fill) fill.style.width = pct + '%';
      if (txt) txt.textContent = pct.toFixed(0) + '% · ' + formatBytes(f.received) + ' / ' + formatBytes(f.meta.size);
    }
  };

  // ---------- SEND FILE ----------
  const sendFile = async (file) => {
    if (!dataConn || !dataConn.open) { showToast('Not connected'); return; }
    if (file.size > 200 * 1024 * 1024) {
      if (!confirm(`File is ${formatBytes(file.size)}. Continue?`)) return;
    }
    const id = 'f' + Date.now() + Math.random().toString(36).slice(2, 8);
    const mime = file.type || 'application/octet-stream';
    sendData({ type: 'file-start', id, name: file.name, size: file.size, mime, time: Date.now() });
    const progEl = addFileProgressMessage(file.name, file.size, true, id);
    const reader = file.slice(0, file.size);
    let offset = 0;
    const total = file.size;
    const sendNext = () => {
      if (!dataConn || !dataConn.open) { addSystemMessage('Connection lost during file send.'); return; }
      if (offset >= total) {
        sendData({ type: 'file-end', id, time: Date.now() });
        const url = URL.createObjectURL(file);
        progEl.remove();
        addFileMessage(url, file.name, file.size, mime, true, Date.now(), myProfile, id);
        showToast('File sent');
        return;
      }
      const end = Math.min(offset + CHUNK_SIZE, total);
      const chunk = reader.slice(offset, end);
      const fr = new FileReader();
      fr.onload = () => {
        if (!sendBinary(fr.result)) { addSystemMessage('Send failed'); return; }
        offset = end;
        const pct = (offset / total) * 100;
        const fill = progEl.querySelector('.progress-fill');
        const txt = progEl.querySelector('.progress-text');
        if (fill) fill.style.width = pct + '%';
        if (txt) txt.textContent = pct.toFixed(0) + '% · ' + formatBytes(offset) + ' / ' + formatBytes(total);
        setTimeout(sendNext, 0);
      };
      fr.onerror = () => addSystemMessage('Error reading file');
      fr.readAsArrayBuffer(chunk);
    };
    sendNext();
  };

  // ---------- MESSAGES ----------
  let msgCounter = 0;
  const buildMessageRow = (contentHTML, isSelf, profile, time, msgId, opts = {}) => {
    const row = document.createElement('div');
    row.className = 'msg-row' + (isSelf ? ' self' : '');
    row.dataset.msgId = msgId;
    const av = document.createElement('div');
    av.className = 'msg-avatar';
    const prof = isSelf ? myProfile : profile;
    if (prof?.avatar) av.innerHTML = `<img src="${escapeAttr(prof.avatar)}" alt="">`;
    else av.textContent = getInitials(prof?.name || (isSelf ? 'You' : 'Peer'));
    const bubble = document.createElement('div');
    bubble.className = 'msg' + (opts.kind === 'date' ? ' date-msg' : '');
    if (opts.replyTo) {
      const rq = document.createElement('div');
      rq.className = 'reply-quote';
      rq.dataset.jump = opts.replyTo.msgId || '';
      rq.innerHTML = `<b>${escapeHtml(opts.replyTo.author || 'Message')}</b><span class="rq-text">${escapeHtml(opts.replyTo.preview || '')}</span>`;
      rq.addEventListener('click', (e) => { e.stopPropagation(); jumpToMessage(opts.replyTo.msgId); });
      bubble.appendChild(rq);
    }
    const contentWrap = document.createElement('span');
    contentWrap.innerHTML = contentHTML;
    bubble.appendChild(contentWrap);
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = formatTime(time);
    bubble.appendChild(meta);
    if (isSelf) {
      const ticks = document.createElement('span');
      ticks.className = 'msg-ticks';
      ticks.textContent = '✓'; ticks.title = 'Sent';
      bubble.appendChild(ticks);
    }
    const copyBtn = document.createElement('button');
    copyBtn.className = 'msg-copy';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = bubble.dataset.rawText || bubble.innerText.replace(/\s+/g, ' ').trim();
      navigator.clipboard?.writeText(text).then(() => showToast('Copied'));
    });
    bubble.appendChild(copyBtn);
    const replyBtn = document.createElement('button');
    replyBtn.className = 'msg-reply-btn';
    replyBtn.textContent = '↩'; replyBtn.title = 'Reply';
    replyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const author = isSelf ? (myProfile.name || 'You') : (profile?.name || 'Peer');
      const preview = (bubble.dataset.rawText || bubble.innerText.replace(/\s+/g, ' ').trim()).slice(0, 120);
      startReply(msgId, author, preview);
    });
    bubble.appendChild(replyBtn);
    const reactionBar = document.createElement('div');
    reactionBar.className = 'reaction-bar';
    ['👍', '❤️', '😂', '😮', '😢'].forEach(emoji => {
      const b = document.createElement('button');
      b.textContent = emoji;
      b.addEventListener('click', (e) => { e.stopPropagation(); sendReaction(msgId, emoji); });
      reactionBar.appendChild(b);
    });
    bubble.appendChild(reactionBar);
    const reactions = document.createElement('div');
    reactions.className = 'msg-reactions';
    reactions.dataset.reactions = '{}';
    bubble.appendChild(reactions);
    row.appendChild(av); row.appendChild(bubble);
    return row;
  };
  const addMediaBubbleControls = (bubble, msgId, isSelf, profile) => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'msg-copy';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard?.writeText(bubble.dataset.rawText || '').then(() => showToast('Copied'));
    });
    bubble.appendChild(copyBtn);
    const replyBtn = document.createElement('button');
    replyBtn.className = 'msg-reply-btn';
    replyBtn.textContent = '↩'; replyBtn.title = 'Reply';
    replyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const author = isSelf ? (myProfile.name || 'You') : (profile?.name || 'Peer');
      startReply(msgId, author, bubble.dataset.rawText || 'Attachment');
    });
    bubble.appendChild(replyBtn);
  };
  const addChatMessage = (text, isSelf, time, profile, opts = {}) => {
    const msgId = opts.msgId || ('m' + (++msgCounter) + Date.now());
    const icon = opts.kind === 'date' ? '📅 ' : '';
    const contentHTML = `<span class="msg-text">${icon}${linkify(text)}</span>`;
    const row = buildMessageRow(contentHTML, isSelf, profile, time, msgId, opts);
    const bubble = row.querySelector('.msg');
    bubble.dataset.rawText = text;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    if (!isSelf) observeIncomingRow(row);
    return msgId;
  };
  const startReply = (msgId, author, preview) => {
    replyingTo = { msgId, author, preview };
    replyPreviewAuthor.textContent = 'Replying to ' + author;
    replyPreviewText.textContent = preview || '';
    replyPreview.classList.add('active');
    chatInput.focus();
  };
  const cancelReply = () => { replyingTo = null; replyPreview.classList.remove('active'); };
  replyPreviewClose.addEventListener('click', cancelReply);
  const jumpToMessage = (msgId) => {
    if (!msgId) return;
    const row = document.querySelector(`.msg-row[data-msg-id="${CSS.escape(msgId)}"]`);
    if (!row) { showToast('Original message not found'); return; }
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    row.classList.add('flash-highlight');
    setTimeout(() => row.classList.remove('flash-highlight'), 1300);
  };
  let seenObserver = null;
  const observeIncomingRow = (row) => { if (seenObserver) seenObserver.observe(row); };
  const initSeenObserver = () => {
    seenObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
          const row = entry.target;
          if (row.dataset.seenSent === '1') return;
          if (!document.getElementById('panel-chat').classList.contains('active')) return;
          const msgId = row.dataset.msgId;
          if (!msgId) return;
          row.dataset.seenSent = '1';
          sendData({ type: 'seen', msgId });
          seenObserver.unobserve(row);
        }
      });
    }, { root: messages, threshold: [0.55] });
  };
  const checkSeenVisible = () => {
    if (!seenObserver) return;
    document.querySelectorAll('.msg-row:not(.self)').forEach(row => {
      if (row.dataset.seenSent !== '1') seenObserver.observe(row);
    });
  };
  const markMessageSeen = (msgId) => {
    if (!msgId) return;
    const row = document.querySelector(`.msg-row.self[data-msg-id="${CSS.escape(msgId)}"]`);
    if (!row) return;
    const ticks = row.querySelector('.msg-ticks');
    if (ticks) { ticks.textContent = '✓✓'; ticks.classList.add('seen'); ticks.title = 'Seen'; }
  };
  const addAudioMessage = (url, isSelf, time, profile, idOverride) => {
    const msgId = idOverride || ('m' + (++msgCounter) + Date.now());
    const audio = document.createElement('audio');
    audio.controls = true; audio.src = url; audio.preload = 'metadata';
    const row = document.createElement('div');
    row.className = 'msg-row' + (isSelf ? ' self' : '');
    row.dataset.msgId = msgId;
    const av = document.createElement('div');
    av.className = 'msg-avatar';
    const prof = isSelf ? myProfile : profile;
    if (prof?.avatar) av.innerHTML = `<img src="${escapeAttr(prof.avatar)}" alt="">`;
    else av.textContent = getInitials(prof?.name || (isSelf ? 'You' : 'Peer'));
    const bubble = document.createElement('div');
    bubble.className = 'msg';
    bubble.dataset.rawText = '🎤 Voice message';
    bubble.appendChild(audio);
    const meta = document.createElement('span');
    meta.className = 'meta'; meta.textContent = formatTime(time);
    bubble.appendChild(meta);
    if (isSelf) {
      const ticks = document.createElement('span');
      ticks.className = 'msg-ticks'; ticks.textContent = '✓'; ticks.title = 'Sent';
      bubble.appendChild(ticks);
    }
    addMediaBubbleControls(bubble, msgId, isSelf, profile);
    const reactions = document.createElement('div');
    reactions.className = 'msg-reactions'; reactions.dataset.reactions = '{}';
    bubble.appendChild(reactions);
    row.appendChild(av); row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    if (!isSelf) observeIncomingRow(row);
  };
  const addFileMessage = (url, name, size, mime, isSelf, time, profile, idOverride) => {
    const msgId = idOverride || ('m' + (++msgCounter) + Date.now());
    const row = document.createElement('div');
    row.className = 'msg-row' + (isSelf ? ' self' : '');
    row.dataset.msgId = msgId;
    const av = document.createElement('div');
    av.className = 'msg-avatar';
    const prof = isSelf ? myProfile : profile;
    if (prof?.avatar) av.innerHTML = `<img src="${escapeAttr(prof.avatar)}" alt="">`;
    else av.textContent = getInitials(prof?.name || (isSelf ? 'You' : 'Peer'));
    const bubble = document.createElement('div');
    bubble.className = 'msg';
    bubble.dataset.rawText = '📎 ' + name;
    if (mime && mime.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = url; img.alt = name; img.loading = 'lazy';
      img.addEventListener('click', () => window.open(url, '_blank'));
      bubble.appendChild(img);
    } else if (mime && mime.startsWith('video/')) {
      const vid = document.createElement('video');
      vid.src = url; vid.controls = true; vid.preload = 'metadata';
      bubble.appendChild(vid);
    } else if (mime && mime.startsWith('audio/')) {
      const aud = document.createElement('audio');
      aud.src = url; aud.controls = true; aud.preload = 'metadata';
      bubble.appendChild(aud);
    }
    const box = document.createElement('div');
    box.className = 'file-box';
    const icon = document.createElement('span');
    icon.className = 'fi'; icon.textContent = getFileIcon(mime, name);
    const fn = document.createElement('span');
    fn.className = 'fn'; fn.textContent = name + ' · ' + formatBytes(size);
    const link = document.createElement('a');
    link.href = url; link.download = name; link.textContent = 'Save';
    box.appendChild(icon); box.appendChild(fn); box.appendChild(link);
    bubble.appendChild(box);
    const meta = document.createElement('span');
    meta.className = 'meta'; meta.textContent = formatTime(time);
    bubble.appendChild(meta);
    if (isSelf) {
      const ticks = document.createElement('span');
      ticks.className = 'msg-ticks'; ticks.textContent = '✓'; ticks.title = 'Sent';
      bubble.appendChild(ticks);
    }
    addMediaBubbleControls(bubble, msgId, isSelf, profile);
    const reactions = document.createElement('div');
    reactions.className = 'msg-reactions'; reactions.dataset.reactions = '{}';
    bubble.appendChild(reactions);
    row.appendChild(av); row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    if (!isSelf) observeIncomingRow(row);
  };
  const addFileProgressMessage = (name, size, isSelf, id) => {
    const row = document.createElement('div');
    row.className = 'msg-row' + (isSelf ? ' self' : '');
    row.dataset.progressId = id;
    row.innerHTML = `
      <div class="msg-avatar">${getInitials(myProfile.name)}</div>
      <div class="msg">
        <div style="font-size:0.8rem;margin-bottom:0.2rem;">Sending <b>${escapeHtml(name)}</b></div>
        <div style="font-size:0.65rem;color:#94a3b8;">${formatBytes(size)}</div>
        <div class="progress-wrap">
          <div class="progress-bar"><div class="progress-fill"></div></div>
          <div class="progress-text">0%</div>
        </div>
      </div>`;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    return row;
  };
  const addSystemMessage = (text) => {
    const div = document.createElement('div');
    div.className = 'msg system';
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  };
  const sendReaction = (msgId, emoji) => {
    if (!dataConn || !dataConn.open) return;
    sendData({ type: 'reaction', msgId, emoji });
    addReactionToMessage(msgId, emoji, false);
  };
  const addReactionToMessage = (msgId, emoji, fromPeer) => {
    const row = document.querySelector(`[data-msg-id="${msgId}"]`);
    if (!row) return;
    const reactionsEl = row.querySelector('.msg-reactions');
    if (!reactionsEl) return;
    const reactions = JSON.parse(reactionsEl.dataset.reactions || '{}');
    reactions[emoji] = (reactions[emoji] || 0) + 1;
    reactionsEl.dataset.reactions = JSON.stringify(reactions);
    reactionsEl.innerHTML = '';
    Object.entries(reactions).forEach(([em, count]) => {
      const badge = document.createElement('span');
      badge.className = 'reaction-badge';
      badge.textContent = em + ' ' + count;
      badge.addEventListener('click', () => sendReaction(msgId, em));
      reactionsEl.appendChild(badge);
    });
  };
  const getFileIcon = (mime, name) => {
    if (mime && mime.startsWith('image/')) return '🖼️';
    if (mime && mime.startsWith('video/')) return '🎬';
    if (mime && mime.startsWith('audio/')) return '🎵';
    if (name && /\.(pdf)$/i.test(name)) return '📕';
    if (name && /\.(doc|docx)$/i.test(name)) return '📘';
    if (name && /\.(xls|xlsx)$/i.test(name)) return '📗';
    if (name && /\.(ppt|pptx)$/i.test(name)) return '📙';
    if (name && /\.(zip|rar|7z)$/i.test(name)) return '🗜️';
    return '📁';
  };
  const base64ToBlob = (b64, mime) => {
    const byteChars = atob(b64);
    const byteNums = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) byteNums[i] = byteChars.charCodeAt(i);
    return new Blob([new Uint8Array(byteNums)], { type: mime || 'audio/webm' });
  };
  const browserNotify = (title, body) => {
    if (!currentSettings.notificationsEnabled) return;
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      try { new Notification(title, { body, icon: 'icon128.png' }); } catch (e) {}
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  // ---------- DATA CONNECTION ----------
  const setupDataConn = (conn, initiator) => {
    dataConn = conn;
    if (initiator) { mySymbol = 'X'; peerSymbol = 'O'; }
    else           { mySymbol = 'O'; peerSymbol = 'X'; }
    conn.on('open', () => {
      setStatus('Connected', 'connected');
      chatInput.disabled = false; sendBtn.disabled = false; recordBtn.disabled = false;
      attachBtn.disabled = false; resetGameBtn.disabled = false;
      addSystemMessage(`Connected — you are ${mySymbol}. ${currentPlayer} starts.`);
      showToast('Peer connected');
      sendData({ type: 'profile', name: myProfile.name, avatar: myProfile.avatar, number: myNumber, wins: myTotalWins });
      board = Array(9).fill(null); currentPlayer = 'X'; gameActive = true; gameWinner = null;
      round = 1; myScore = 0; peerScore = 0; peerPresence = 'active';
      renderBoard(); updatePeerInfo(); updateGamePlayerCards();
      sendPresence(document.hidden ? 'away' : 'active');
      renderContacts();
    });
    conn.on('data', handleIncomingData);
    conn.on('close', () => {
      setStatus('Disconnected', '');
      chatInput.disabled = true; sendBtn.disabled = true; recordBtn.disabled = true;
      attachBtn.disabled = true; resetGameBtn.disabled = true;
      addSystemMessage('Peer disconnected.');
      dataConn = null; peerProfile = null; peerPresence = null; awaitingInviteReply = false;
      if (peerNumber) { lastSeenMap[peerNumber] = Date.now(); saveLastSeenMap(); }
      showPeerTyping(false); endCall(false); hideActiveCall();
      gameStatusEl.textContent = 'Connect to a peer to play';
      updatePeerInfo(); renderContacts();
    });
    conn.on('error', (err) => console.warn('DataConn error', err));
  };

  // ---------- PEERJS ----------
  let idRetries = 0;
  const initPeer = (number) => {
    if (peer) { try { peer.destroy(); } catch (e) {} }
    peer = new Peer('p2p-num-' + number, { debug: 0, config: { iceServers: ICE_SERVERS } });
    peer.on('open', () => { idRetries = 0; setStatus('Online', 'connected'); });
    peer.on('connection', (conn) => {
      if (dataConn && dataConn.open) { try { conn.close(); } catch (e) {} return; }
      peerNumber = conn.peer.replace('p2p-num-', '');
      setupDataConn(conn, false);
    });
    peer.on('call', (call) => handleIncomingMediaCall(call));
    peer.on('error', (err) => {
      console.warn('Peer error:', err.type);
      if (err.type === 'unavailable-id') {
        if (idRetries++ < 5) {
          myNumber = generateNumber();
          myNumberText.textContent = myNumber;
          storage.set('my_number', myNumber);
          setTimeout(() => initPeer(myNumber), 200);
        } else setStatus('ID collision — reload', 'error');
      } else if (err.type === 'peer-unavailable') {
        showToast('Number not online'); setStatus('Peer unavailable', 'error');
        setCallState('idle'); hideActiveCall(); stopRingtone();
      } else if (err.type === 'network' || err.type === 'server-error' || err.type === 'socket-error') {
        setStatus('Network issue', 'connecting');
      } else setStatus('Error: ' + err.type, 'error');
    });
    peer.on('disconnected', () => {
      setStatus('Reconnecting…', 'connecting');
      try { peer.reconnect(); } catch (e) {}
    });
  };

  // ---------- CALLS ----------
  const makeCall = async (targetNumber, type = 'voice') => {
    if (!peer || peer.destroyed) { showToast('Not ready'); return; }
    if (!targetNumber) { showToast('Enter a number'); return; }
    if (targetNumber === myNumber) { showToast('Cannot call yourself'); return; }
    if (callState !== 'idle') { showToast('Already in a call'); return; }
    peerNumber = targetNumber; callType = type;
    setCallState('calling', type);
    showActiveCall(targetNumber, 'Calling…');
    startRingtone();
    try {
      if (type === 'video') await getMicAndCam();
      else await getMic();
    } catch (e) {
      showToast(type === 'video' ? 'Camera/mic denied' : 'Mic denied');
      setCallState('idle'); hideActiveCall(); stopRingtone(); return;
    }
    if (!dataConn || !dataConn.open) {
      try {
        const conn = peer.connect('p2p-num-' + targetNumber, { reliable: true });
        setupDataConn(conn, true);
      } catch (e) {
        showToast('Cannot reach number'); setCallState('idle'); hideActiveCall(); stopRingtone(); return;
      }
    }
    const trySendRequest = () => {
      if (dataConn && dataConn.open) {
        sendData({ type: 'call-request', from: myNumber, to: targetNumber, callType: type,
          profile: { name: myProfile.name, avatar: myProfile.avatar, number: myNumber } });
        callStateText.textContent = 'Ringing…';
      } else setTimeout(trySendRequest, 500);
    };
    trySendRequest();
    setTimeout(() => {
      if (callState === 'calling') {
        stopRingtone(); setCallState('idle'); hideActiveCall(); showToast('No answer');
      }
    }, 30000);
  };
  const showIncomingCall = (fromNumber, type, profile) => {
    if (callState !== 'idle') {
      sendData({ type: 'call-reject', from: myNumber, to: fromNumber });
      return;
    }
    callState = 'ringing'; callType = type; peerNumber = fromNumber;
    peerProfile = profile || peerProfile;
    incomingNumber.textContent = '#' + fromNumber;
    incomingName.textContent = profile?.name || 'Unknown';
    incomingType.textContent = type === 'video' ? 'Video call' : 'Voice call';
    if (profile?.avatar) incomingAvatar.innerHTML = `<img src="${escapeAttr(profile.avatar)}" alt="">`;
    else incomingAvatar.textContent = type === 'video' ? '📹' : '📞';
    incomingOverlay.classList.add('active');
    startRingtone();
    browserNotify('📞 Incoming ' + (type === 'video' ? 'video ' : '') + 'call', (profile?.name || 'Peer') + ' is calling…');
  };
  const acceptIncomingCall = async () => {
    incomingOverlay.classList.remove('active'); stopRingtone();
    try {
      if (callType === 'video') await getMicAndCam();
      else await getMic();
    } catch (e) {
      showToast('Media access denied');
      sendData({ type: 'call-reject', from: myNumber, to: peerNumber });
      callState = 'idle'; return;
    }
    sendData({ type: 'call-accept', from: myNumber, to: peerNumber, callType });
    setCallState('in-call', callType);
    showActiveCall(peerNumber, 'Connected');
    startVoiceCall(callType);
  };
  const rejectIncomingCall = () => {
    incomingOverlay.classList.remove('active'); stopRingtone();
    sendData({ type: 'call-reject', from: myNumber, to: peerNumber });
    callState = 'idle'; showToast('Call rejected');
  };
  acceptCallBtn.addEventListener('click', acceptIncomingCall);
  rejectCallBtn.addEventListener('click', rejectIncomingCall);
  const startVoiceCall = (type = 'voice') => {
    if (!peer || peer.destroyed) return;
    if (mediaCall) { try { mediaCall.close(); } catch (e) {} mediaCall = null; }
    if (!localStream) return;
    const targetId = 'p2p-num-' + peerNumber;
    const call = peer.call(targetId, localStream, { metadata: { type } });
    if (!call) { showToast('Call failed'); return; }
    mediaCall = call;
    call.on('stream', (remote) => {
      remoteStream = remote;
      if (type === 'video') {
        remoteVideo.srcObject = remote; remoteVideo.play().catch(() => {}); enableVideoMode(true);
      } else playRemoteStream(remote);
      callStateText.textContent = 'In call';
    });
    call.on('close', () => endCall(false));
    call.on('error', (err) => { console.warn('Media call error', err); endCall(false); });
  };
  const handleIncomingMediaCall = (call) => {
    if (callState === 'in-call' && localStream) {
      call.answer(localStream);
      mediaCall = call;
      call.on('stream', (remote) => {
        remoteStream = remote;
        if (callType === 'video') {
          remoteVideo.srcObject = remote; remoteVideo.play().catch(() => {}); enableVideoMode(true);
        } else playRemoteStream(remote);
      });
      call.on('close', () => endCall(false));
      call.on('error', () => endCall(false));
    } else { try { call.close(); } catch (e) {} }
  };
  const enableVideoMode = (on) => {
    if (on) {
      videoCallContainer.classList.add('active');
      activeCallPanel.classList.add('hidden');
      dialPad.classList.add('hidden');
      isVideoEnabled = true;
      videoToggleBtn.classList.add('active');
      localVideoLabel.textContent = myProfile.name || 'You';
      if (peerProfile) remoteVideoLabel.textContent = peerProfile.name || 'Peer';
      if (localStream && localStream.getVideoTracks().length) {
        localVideo.srcObject = localStream; localVideo.muted = true; localVideo.play().catch(() => {});
      }
    } else {
      videoCallContainer.classList.remove('active');
      if (callState === 'in-call') activeCallPanel.classList.remove('hidden');
      else dialPad.classList.remove('hidden');
      isVideoEnabled = false;
      videoToggleBtn.classList.remove('active');
      localVideo.srcObject = null; remoteVideo.srcObject = null;
    }
  };
  const endCall = (sendSignal = true) => {
    if (sendSignal && peerNumber) sendData({ type: 'call-hangup', from: myNumber, to: peerNumber });
    if (mediaCall) { try { mediaCall.close(); } catch (e) {} mediaCall = null; }
    if (remoteStream) { remoteStream.getTracks().forEach(t => t.stop()); remoteStream = null; }
    if (audioEl) audioEl.srcObject = null;
    remoteVideo.srcObject = null; localVideo.srcObject = null;
    stopRingtone();
    if (localStream) { localStream.getTracks().forEach(t => t.stop()); localStream = null; }
    isVideoEnabled = false;
    videoCallContainer.classList.remove('active');
    setCallState('idle'); hideActiveCall();
  };
  const setCallState = (state, type) => {
    callState = state;
    if (state === 'idle') {
      dialPad.classList.remove('hidden');
      activeCallPanel.classList.add('hidden');
      videoCallContainer.classList.remove('active');
      callNowBtn.disabled = false; videoCallBtn.disabled = false;
      muteCallBtn.classList.remove('muted'); muteCallBtn.textContent = '🎤';
      videoMuteBtn.classList.remove('muted'); videoMuteBtn.textContent = '🎤';
      isMuted = false;
      if (localStream) localStream.getAudioTracks().forEach(t => t.enabled = true);
    } else {
      dialPad.classList.add('hidden');
      if (type === 'video' || isVideoEnabled) {
        videoCallContainer.classList.add('active');
        activeCallPanel.classList.add('hidden');
      } else activeCallPanel.classList.remove('hidden');
      callNowBtn.disabled = true; videoCallBtn.disabled = true;
    }
  };
  const showActiveCall = (number, stateText) => {
    callNumberDisp.textContent = '#' + number;
    callStateText.textContent = stateText;
    if (peerProfile?.name) {
      callNameDisp.textContent = peerProfile.name;
      callAvatar.innerHTML = peerProfile.avatar
        ? `<img src="${escapeAttr(peerProfile.avatar)}" alt="">` : getInitials(peerProfile.name);
    } else { callNameDisp.textContent = ''; callAvatar.textContent = '👤'; }
  };
  const hideActiveCall = () => {
    activeCallPanel.classList.add('hidden');
    videoCallContainer.classList.remove('active');
    dialPad.classList.remove('hidden');
    callNowBtn.disabled = false; videoCallBtn.disabled = false;
  };
  const toggleMute = () => {
    if (!localStream) return;
    const track = localStream.getAudioTracks()[0]; if (!track) return;
    isMuted = !isMuted; track.enabled = !isMuted;
    muteCallBtn.classList.toggle('muted', isMuted); muteCallBtn.textContent = isMuted ? '🔇' : '🎤';
    videoMuteBtn.classList.toggle('muted', isMuted); videoMuteBtn.textContent = isMuted ? '🔇' : '🎤';
  };
  muteCallBtn.addEventListener('click', toggleMute);
  videoMuteBtn.addEventListener('click', toggleMute);
  const toggleVideo = async () => {
    if (callState !== 'in-call' && callState !== 'calling') return;
    if (!isVideoEnabled) {
      try {
        const stream = await getMicAndCam();
        if (mediaCall && mediaCall.peerConnection) {
          const sender = mediaCall.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
          const videoTrack = stream.getVideoTracks()[0];
          if (sender && videoTrack) await sender.replaceTrack(videoTrack);
          else if (videoTrack) mediaCall.peerConnection.addTrack(videoTrack, stream);
        }
        enableVideoMode(true); sendData({ type: 'video-on' });
      } catch (e) { showToast('Camera access denied'); }
    } else {
      const videoTrack = localStream && localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.stop();
        if (mediaCall && mediaCall.peerConnection) {
          const sender = mediaCall.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
          if (sender) await sender.replaceTrack(null);
        }
      }
      enableVideoMode(false); sendData({ type: 'video-off' });
    }
  };
  videoToggleBtn.addEventListener('click', toggleVideo);
  voiceToVideoBtn.addEventListener('click', toggleVideo);
  hangupCallBtn.addEventListener('click', () => { endCall(true); showToast('Call ended'); });
  videoHangupBtn.addEventListener('click', () => { endCall(true); showToast('Call ended'); });

  // ---------- CHAT SEND ----------
  const sendChatText = () => {
    const text = chatInput.value.trim();
    if (!text) return;
    if (!dataConn || !dataConn.open) { showToast('Not connected'); return; }
    const time = Date.now();
    const replyPayload = replyingTo ? { msgId: replyingTo.msgId, author: replyingTo.author, preview: replyingTo.preview } : null;
    const msgId = addChatMessage(text, true, time, myProfile, { replyTo: replyPayload });
    sendData({ type: 'chat', text, time, replyTo: replyPayload, msgId });
    chatInput.value = ''; cancelReply();
    if (dataConn && dataConn.open) sendData({ type: 'typing', on: false });
    typingSentAt = 0;
    saveChatHistory();
  };
  sendBtn.addEventListener('click', sendChatText);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatText(); });
  chatInput.addEventListener('input', () => {
    if (chatInput.value.trim().length > 0) notifyTyping();
    else if (dataConn && dataConn.open) { sendData({ type: 'typing', on: false }); typingSentAt = 0; }
  });
  chatInput.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) sendFile(file);
        return;
      }
    }
  });
  const startRecording = async () => {
    if (isRecording) return;
    if (!dataConn || !dataConn.open) { showToast('Not connected'); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      recordedChunks = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) recordedChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (recordedChunks.length === 0) return;
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          const time = Date.now();
          const url = URL.createObjectURL(blob);
          const id = 'a' + Date.now() + Math.random().toString(36).slice(2, 8);
          addAudioMessage(url, true, time, myProfile, id);
          sendData({ type: 'audio', data: base64, mime: 'audio/webm', time, id });
        };
        reader.readAsDataURL(blob);
      };
      mediaRecorder.start();
      isRecording = true;
      recordBtn.classList.add('recording');
      recordBtn.textContent = '⏹️';
      showToast('Recording…');
    } catch (e) { showToast('Mic access denied'); }
  };
  const stopRecording = () => {
    if (!isRecording) return;
    isRecording = false;
    recordBtn.classList.remove('recording');
    recordBtn.textContent = '🎙️';
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
  };
  recordBtn.addEventListener('mousedown', startRecording);
  recordBtn.addEventListener('mouseup', stopRecording);
  recordBtn.addEventListener('mouseleave', () => { if (isRecording) stopRecording(); });
  recordBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRecording(); });
  recordBtn.addEventListener('touchend', (e) => { e.preventDefault(); stopRecording(); });
  attachBtn.addEventListener('click', (e) => { e.stopPropagation(); attachMenu.classList.toggle('active'); });
  document.addEventListener('click', (e) => {
    if (!attachMenu.contains(e.target) && e.target !== attachBtn) attachMenu.classList.remove('active');
  });
  attachMenu.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const type = btn.dataset.type;
    attachMenu.classList.remove('active');
    if (type === 'image') imageInput.click();
    else if (type === 'video') videoInput.click();
    else if (type === 'audio') audioInput.click();
    else fileInput.click();
  });
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    for (const f of files) sendFile(f);
    e.target.value = '';
  };
  fileInput.addEventListener('change', handleFileSelect);
  imageInput.addEventListener('change', handleFileSelect);
  videoInput.addEventListener('change', handleFileSelect);
  audioInput.addEventListener('change', handleFileSelect);
  messages.addEventListener('dragover', (e) => e.preventDefault());
  messages.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) for (const f of e.dataTransfer.files) sendFile(f);
  });
  bgPickerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    datePickerPopup.classList.remove('active');
    bgSwatches.classList.toggle('active');
  });
  bgSwatches.addEventListener('click', (e) => {
    const sw = e.target.closest('.swatch');
    if (!sw) return;
    const bg = sw.dataset.bg;
    messages.style.background = bg;
    messages.dataset.bg = bg;
    saveChatBg(bg);
    document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s === sw));
    bgSwatches.classList.remove('active');
  });
  dateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    bgSwatches.classList.remove('active');
    if (!datePickerPopup.classList.contains('active')) {
      const now = new Date();
      dateInputField.value = now.toISOString().slice(0, 10);
      timeInputField.value = now.toTimeString().slice(0, 5);
    }
    datePickerPopup.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!datePickerPopup.contains(e.target) && e.target !== dateBtn) datePickerPopup.classList.remove('active');
  });
  sendDateBtn.addEventListener('click', () => {
    if (!dataConn || !dataConn.open) { showToast('Not connected'); return; }
    const d = dateInputField.value, t = timeInputField.value;
    if (!d) { showToast('Pick a date'); return; }
    let label;
    try {
      const dt = new Date(d + 'T' + (t || '00:00'));
      label = dt.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      if (t) label += ' · ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) { label = d + (t ? ' ' + t : ''); }
    const time = Date.now();
    const msgId = addChatMessage(label, true, time, myProfile, { kind: 'date' });
    sendData({ type: 'chat', text: label, time, kind: 'date', msgId });
    datePickerPopup.classList.remove('active');
    saveChatHistory();
    showToast('Date sent');
  });
  const calcUpdateDisplay = () => { calcDisplay.textContent = calc.display; };
  const calcCompute = (a, b, op) => {
    a = parseFloat(a); b = parseFloat(b);
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? NaN : a / b;
      default:  return b;
    }
  };
  const calcFormat = (n) => {
    if (!isFinite(n)) return 'Error';
    let s = String(Math.round(n * 1e10) / 1e10);
    if (s.length > 14) s = n.toExponential(6);
    return s;
  };
  calcGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const k = btn.dataset.k;
    if (k === 'clear') calc = { display: '0', prev: null, op: null, waitingForNew: false };
    else if (k === 'sign') calc.display = String(parseFloat(calc.display) * -1);
    else if (k === 'percent') calc.display = calcFormat(parseFloat(calc.display) / 100);
    else if (['+', '-', '×', '÷'].includes(k)) {
      if (calc.op && !calc.waitingForNew) calc.display = calcFormat(calcCompute(calc.prev, calc.display, calc.op));
      calc.prev = calc.display; calc.op = k; calc.waitingForNew = true;
    } else if (k === '=') {
      if (calc.op) {
        calc.display = calcFormat(calcCompute(calc.prev, calc.display, calc.op));
        calc.op = null; calc.prev = null; calc.waitingForNew = true;
      }
    } else if (k === '.') {
      if (calc.waitingForNew) { calc.display = '0.'; calc.waitingForNew = false; }
      else if (!calc.display.includes('.')) calc.display += '.';
    } else {
      if (calc.waitingForNew || calc.display === '0') { calc.display = k; calc.waitingForNew = false; }
      else calc.display += k;
    }
    calcUpdateDisplay();
  });
  calcBtn.addEventListener('click', () => {
    calc = { display: '0', prev: null, op: null, waitingForNew: false };
    calcUpdateDisplay(); calcOverlay.classList.add('active');
  });
  calcCloseBtn.addEventListener('click', () => calcOverlay.classList.remove('active'));

  // ---------- GAME INVITE ----------
  const startNewRound = (newRound) => {
    board = Array(9).fill(null); currentPlayer = 'X'; gameActive = true; gameWinner = null;
    round = newRound; renderBoard();
  };
  gameInviteYesBtn.addEventListener('click', () => {
    gameInviteOverlay.classList.remove('active');
    const newRound = pendingInviteRound || (round + 1);
    startNewRound(newRound);
    sendData({ type: 'game-invite-accept', round: newRound });
    addSystemMessage(`You accepted — round ${round} started.`);
    switchTab('game');
    pendingInviteRound = null;
  });
  gameInviteNoBtn.addEventListener('click', () => {
    gameInviteOverlay.classList.remove('active');
    sendData({ type: 'game-invite-decline' });
    addSystemMessage('You declined the game invite.');
    pendingInviteRound = null;
  });

  // ---------- CHAT PERSISTENCE ----------
  const saveChatHistory = () => {
    if (!dataConn || !dataConn.open) return;
    try {
      sessionStorage.setItem('p2p_chat_html', messages.innerHTML);
      localStorage.setItem('p2p_chat_pending', '1');
    } catch (e) {}
  };
  const restoreChatHistory = () => {
    const pending = localStorage.getItem('p2p_chat_pending');
    if (pending === '1') saveChatOverlay.classList.add('active');
  };
  saveChatYesBtn.addEventListener('click', () => {
    try {
      const html = sessionStorage.getItem('p2p_chat_html');
      if (html) { messages.innerHTML = html; messages.scrollTop = messages.scrollHeight; }
    } catch (e) {}
    localStorage.removeItem('p2p_chat_pending');
    saveChatOverlay.classList.remove('active');
    showToast('Chat kept');
  });
  saveChatNoBtn.addEventListener('click', () => {
    try { sessionStorage.removeItem('p2p_chat_html'); } catch (e) {}
    localStorage.removeItem('p2p_chat_pending');
    saveChatOverlay.classList.remove('active');
    messages.innerHTML = '<div class="msg system">Connect to a peer to start chatting.</div>';
    showToast('Chat cleared');
  });

  // ---------- GAME ----------
  function renderBoard() {
    boardEl.innerHTML = '';
    board.forEach((cell, idx) => {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      if (cell === 'X') { cellDiv.textContent = 'X'; cellDiv.classList.add('x-move'); }
      else if (cell === 'O') { cellDiv.textContent = 'O'; cellDiv.classList.add('o-move'); }
      if (!gameActive || gameWinner || cell) cellDiv.classList.add('disabled');
      if (gameWinner && gameWinner !== 'draw') {
        const winLines = getWinLine();
        if (winLines && winLines.includes(idx)) cellDiv.classList.add('won');
      }
      cellDiv.addEventListener('click', () => handleCellClick(idx));
      boardEl.appendChild(cellDiv);
    });
    if (gameWinner) {
      if (gameWinner === 'draw') gameStatusEl.textContent = `Round ${round} — Draw`;
      else if (gameWinner === mySymbol) gameStatusEl.textContent = `${myProfile.name || 'You'} win round ${round}!`;
      else gameStatusEl.textContent = `${peerProfile?.name || 'Peer'} win round ${round}!`;
    } else {
      gameStatusEl.textContent = `${currentPlayer === mySymbol ? 'Your' : "Peer's"} turn (${currentPlayer})`;
    }
    updateGamePlayerCards();
    resetGameBtn.disabled = !dataConn || !dataConn.open;
  }
  function getWinLine() {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return line;
    }
    return null;
  }
  function checkWinner(b) {
    const line = getWinLineFrom(b);
    if (line) return b[line[0]];
    return b.every(c => c !== null) ? 'draw' : null;
  }
  function getWinLineFrom(b) {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const line of lines) {
      const [a, b2, c] = line;
      if (b[a] && b[a] === b[b2] && b[a] === b[c]) return line;
    }
    return null;
  }
  function handleCellClick(index) {
    if (!gameActive || gameWinner || board[index]) return;
    if (!dataConn || !dataConn.open) { showToast('Not connected'); return; }
    if (currentPlayer !== mySymbol) { showToast(`It's peer's turn (${currentPlayer})`); return; }
    makeMove(index, mySymbol);
    sendData({ type: 'move', index, symbol: mySymbol });
  }
  function makeMove(index, symbol) {
    if (!gameActive || gameWinner || board[index]) return;
    board[index] = symbol;
    const winner = checkWinner(board);
    if (winner) {
      gameActive = false; gameWinner = winner;
      if (winner === 'draw') addSystemMessage(`Round ${round} draw.`);
      else {
        if (winner === mySymbol) { myScore++; myTotalWins++; saveWinCount(); addSystemMessage(`You won round ${round}!`); }
        else { peerScore++; addSystemMessage(`Peer won round ${round}.`); }
        sendData({ type: 'wins-update', wins: myTotalWins });
      }
    } else currentPlayer = (symbol === 'X' ? 'O' : 'X');
    renderBoard();
  }
  function updateGamePlayerCards() {
    pcNameMe.textContent = myProfile.name || 'You';
    pcSymbolMe.textContent = mySymbol === 'X' ? 'X (emerald)' : 'O (brass)';
    pcSymbolMe.style.color = mySymbol === 'X' ? '#2A6F62' : '#C5A46B';
    pcWinsMe.textContent = myTotalWins;
    if (myProfile.avatar) pcAvatarMe.innerHTML = `<img src="${escapeAttr(myProfile.avatar)}" alt="">`;
    else pcAvatarMe.textContent = getInitials(myProfile.name);
    pcNamePeer.textContent = peerProfile?.name || 'Peer';
    pcSymbolPeer.textContent = peerSymbol === 'X' ? 'X (emerald)' : 'O (brass)';
    pcSymbolPeer.style.color = peerSymbol === 'X' ? '#2A6F62' : '#C5A46B';
    pcWinsPeer.textContent = peerTotalWins;
    if (peerProfile?.avatar) pcAvatarPeer.innerHTML = `<img src="${escapeAttr(peerProfile.avatar)}" alt="">`;
    else pcAvatarPeer.textContent = getInitials(peerProfile?.name || '?');
  }
  resetGameBtn.addEventListener('click', () => {
    if (!dataConn || !dataConn.open) return;
    if (awaitingInviteReply) { showToast('Already waiting for a reply'); return; }
    awaitingInviteReply = true;
    sendData({ type: 'game-invite', round: round + 1 });
    gameStatusEl.textContent = 'Invite sent — waiting for peer…';
    resetGameBtn.disabled = true;
    showToast('Invite sent to peer');
    setTimeout(() => {
      if (awaitingInviteReply) {
        awaitingInviteReply = false;
        resetGameBtn.disabled = !(dataConn && dataConn.open);
        renderBoard();
        showToast('No response from peer');
      }
    }, 20000);
  });

  // ---------- INIT ----------
  const init = async () => {
    let savedNumber = storage.get('my_number', null);
    if (savedNumber && /^\d{4}$/.test(savedNumber)) myNumber = savedNumber;
    else {
      myNumber = generateNumber();
      storage.set('my_number', myNumber);
    }
    myNumberText.textContent = myNumber;
    settingsIdText.textContent = myNumber;

    myNumberEl.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard?.writeText(myNumber).then(
        () => showToast('Number copied'),
        () => showToast('Your number: ' + myNumber)
      );
    });

    loadProfile();
    renderMyProfile();
    loadContacts();
    loadWinCount();
    loadChatBg();
    loadLastSeen();
    loadSettings();

    if (!storage.get('setup_seen', false)) setupOverlay.classList.add('active');
    if (!storage.get('profile', null)) openProfileModal(true);

    initPeer(myNumber);
    setStatus('Connecting…', 'connecting');

    callNowBtn.addEventListener('click', () => {
      const num = peerNumberInput.value.trim();
      if (!/^\d{4}$/.test(num)) { showToast('Enter a 4-digit number'); return; }
      makeCall(num, 'voice');
    });
    videoCallBtn.addEventListener('click', () => {
      const num = peerNumberInput.value.trim();
      if (!/^\d{4}$/.test(num)) { showToast('Enter a 4-digit number'); return; }
      makeCall(num, 'video');
    });
    peerNumberInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') callNowBtn.click(); });

    renderBoard();
    initSeenObserver();

    presenceTickInterval = setInterval(() => {
      if (dataConn && dataConn.open) return;
      if (peerNumber) updatePeerInfo();
      renderContacts();
    }, 15000);

    setTimeout(restoreChatHistory, 400);

    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => Notification.requestPermission(), 3000);
    }

    window.addEventListener('beforeunload', () => {
      try { saveChatHistory(); } catch (e) {}
      if (peer) { try { peer.destroy(); } catch (e) {} }
      if (localStream) localStream.getTracks().forEach(t => t.stop());
    });
  };

  init();
})();