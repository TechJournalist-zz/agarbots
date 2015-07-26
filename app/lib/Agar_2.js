function Agar(address, canvas) {
  this.address = address;
  this.canvas = canvas;
  this.isStopped = false;
  this.socket = null;

  // TODO(ibash) handle connection / exponential backoff, etc
};
module.exports = Agar;

Agar.prototype.stop = function stop() {
  if (self.socket) {
    self.socket.onopen = null;
    self.socket.onmessage = null;
    self.socket.onclose = null;
    try {
      self.socket.close();
    } catch (exception) {}
    self.socket = null;
  }
};

Agar.prototype.start = function start() {
  var self = this;

  Connect(this.address);

  var i18n_lang = 'en';
  var i18n_dict = {
    'en': {
      'connecting': 'Connecting',
      'connect_help': 'If you cannot connect to the servers, check if you have some anti virus or firewall blocking the connection.',
      'play': 'Play',
      'spectate': 'Spectate',
      'login_and_play': 'Login and play',
      'play_as_guest': 'Play as guest',
      'share': 'Share',
      'advertisement': 'Advertisement',
      'privacy_policy': 'Privacy Policy',
      'terms_of_service': 'Terms of Service',
      'changelog': 'Changelog',
      'instructions_mouse': 'Move your mouse to control your cell',
      'instructions_space': 'Press <b>Space</b> to split',
      'instructions_w': 'Press <b>W</b> to eject some mass',
      'gamemode_ffa': 'FFA',
      'gamemode_teams': 'Teams',
      'gamemode_experimental': 'Experimental',
      'region_select': ' -- Select a Region -- ',
      'region_us_east': 'US East',
      'region_us_west': 'US West',
      'region_north_america': 'North America',
      'region_south_america': 'South America',
      'region_europe': 'Europe',
      'region_turkey': 'Turkey',
      'region_poland': 'Poland',
      'region_east_asia': 'East Asia',
      'region_russia': 'Russia',
      'region_china': 'China',
      'region_oceania': 'Oceania',
      'region_australia': 'Australia',
      'region_players': 'players',
      'option_no_skins': 'No skins',
      'option_no_names': 'No names',
      'option_dark_theme': 'Dark theme',
      'option_no_colors': 'No colors',
      'option_show_mass': 'Show mass',
      'leaderboard': 'Leaderboard',
      'unnamed_cell': 'An unnamed cell',
      'last_match_results': 'Last match results',
      'score': 'Score',
      'leaderboard_time': 'Leaderboard Time',
      'mass_eaten': 'Mass Eaten',
      'top_position': 'Top Position',
      'position_1': 'First',
      'position_2': 'Second',
      'position_3': 'Third',
      'position_4': 'Fourth',
      'position_5': 'Fifth',
      'position_6': 'Sixth',
      'position_7': 'Seventh',
      'position_8': 'Eighth',
      'position_9': 'Ninth',
      'position_10': 'Tenth',
      'player_cells_eaten': 'Player Cells Eaten',
      'survival_time': 'Survival Time',
      'games_played': 'Games played',
      'highest_mass': 'Highest mass',
      'total_cells_eaten': 'Total cells eaten',
      'total_mass_eaten': 'Total mass eaten',
      'longest_survival': 'Longest survival',
      'logout': 'Logout',
      'stats': 'Stats',
      'shop': 'Shop',
      'party': 'Party',
      'party_description': 'Play with your friends in the same map',
      'create_party': 'Create',
      'creating_party': 'Creating party...',
      'join_party': 'Join',
      'back_button': 'Back',
      'joining_party': 'Joining party...',
      'joined_party_instructions': 'You are now playing with this party:',
      'party_join_error': 'There was a problem joining that party, please make sure the code is correct, or try creating another party',
      'login_tooltip': 'Login with Facebook and get:<br\xA0/><br /><br />Start the game with more mass!<br />Level up to get even more starting mass!',
      'create_party_instructions': 'Give this link to your friends:',
      'join_party_instructions': 'Your friend should have given you a code, type it here:',
      'continue': 'Continue',
      'option_skip_stats': 'Skip stats',
      'stats_food_eaten': 'food eaten',
      'stats_highest_mass': 'highest mass',
      'stats_time_alive': 'time alive',
      'stats_leaderboard_time': 'leaderboard time',
      'stats_cells_eaten': 'cells eaten',
      'stats_top_position': 'top position',
      '': ''
    },
    '?': {}
  };

  i18n = i18n_dict[i18n_lang];

  (function(window, $) {
    function Init() {
      g_drawLines = true;
      PlayerStats();
      setInterval(PlayerStats, 180000);
      g_canvas = g_canvas_ = document.getElementById('canvas');
      g_context = g_canvas.getContext('2d');

      var spaceDown = false;
      var cachedSkin = false;
      var wkeyDown = false;

      window.onresize = ResizeHandler;

      window.requestAnimationFrame(__unmatched_131);

      ResizeHandler();
    }
    function WheelHandler(event) {
      g_zoom *= Math.pow(0.9, event.wheelDelta / -120 || event.detail || 0);
      if (1 > g_zoom) {
        g_zoom = 1;
      }
      if (g_zoom > 4 / g_scale) {
        g_zoom = 4 / g_scale;
      }
    }
    function UpdateTree() {
      if (0.4 > g_scale) {
        g_pointTree = null;
      } else {
        for (var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY, maxSize = 0, i = 0; i < g_cells.length; i++) {
          var cell = g_cells[i];
          if (!(!cell.N() || cell.R || 20 >= cell.size * g_scale)) {
            maxSize = Math.max(cell.size, maxSize);
            minX = Math.min(cell.x, minX);
            minY = Math.min(cell.y, minY);
            maxX = Math.max(cell.x, maxX);
            maxY = Math.max(cell.y, maxY);
          }
        }
        g_pointTree = QTreeFactory.la({
          ca: minX - (maxSize + 100),
          da: minY - (maxSize + 100),
          oa: maxX + (maxSize + 100),
          pa: maxY + (maxSize + 100),
          ma: 2,
          na: 4
        });
        for (i = 0; i < g_cells.length; i++) {
          if (cell = g_cells[i], cell.N() && !(20 >= cell.size * g_scale)) {
            for (minX = 0; minX < cell.a.length; ++minX) {
              minY = cell.a[minX].x;
              maxX = cell.a[minX].y;
              if (!(minY < g_viewX - g_protocol / 2 / g_scale || maxX < g_viewY - __unmatched_61 / 2 / g_scale || minY > g_viewX + g_protocol / 2 / g_scale || maxX > g_viewY + __unmatched_61 / 2 / g_scale)) {
                g_pointTree.m(cell.a[minX]);
              }
            }
          }
        }
      }
    }

    function PlayerStats() {
      if (null == g_regionLabels) {
        g_regionLabels = {};
        $('#region').children().each(function() {
          var $this = $(this);
          var val = $this.val();
          if (val) {
            g_regionLabels[val] = $this.text();
          }
        });
      }
      $.get('https://m.agar.io/info', function(data) {
        var regionNumPlayers = {};
        var region;
        for (region in data.regions) {
          var region_ = region.split(':')[0];
          regionNumPlayers[region_] = regionNumPlayers[region_] || 0;
          regionNumPlayers[region_] += data.regions[region].numPlayers;
        }
        for (region in regionNumPlayers) {
          $('#region option[value="' + region + '"]').text(g_regionLabels[region] + ' (' + regionNumPlayers[region] + ' players)');
        }
      }, 'json');
    }
    function HideOverlay() {
      $('#adsBottom').hide();
      $('#overlays').hide();
      $('#stats').hide();
      $('#mainPanel').hide();
      __unmatched_142 = g_playerCellDestroyed = false;
      SyncRegion();
      __unmatched_14(window.aa);
    }

    function Render(__unmatched_175) {
      $('#helloContainer').attr('data-gamemode', __unmatched_175);
      __unmatched_96 = __unmatched_175;
      $('#gamemode').val(__unmatched_175);
    }

    function __unmatched_13(__unmatched_176) {
      if (window.googletag) {
        window.googletag.cmd.push(function() {
          if (g_canRefreshAds) {
            g_canRefreshAds = false;
            setTimeout(function() {
              g_canRefreshAds = true;
            }, 60000 * g_refreshAdsCooldown);
            if (window.googletag && window.googletag.pubads && window.googletag.pubads().refresh) {
              window.googletag.pubads().refresh(__unmatched_176);
            }
          }
        });
      }
    }
    function __unmatched_14(__unmatched_177) {
      if (window.googletag && window.googletag.pubads && window.googletag.pubads().clear) {
        window.googletag.pubads().clear(__unmatched_177);
      }
    }
    function __unmatched_15(i_) {
      return window.i18n[i_] || window.i18n_dict.en[i_] || i_;
    }
    function Connect(address) {
      if (self.socket) {
        self.socket.onopen = null;
        self.socket.onmessage = null;
        self.socket.onclose = null;
        try {
          self.socket.close();
        } catch (exception) {}
        self.socket = null;
      }
      if (__unmatched_114.ip) {
        address = 'ws://' + __unmatched_114.ip;
      }

      g_playerCellIds = [];
      g_playerCells = [];
      g_cellsById = {};
      g_cells = [];
      g_destroyedCells = [];
      g_scoreEntries = [];
      g_leaderboardCanvas = g_scorePartitions = null;
      g_maxScore = 0;
      g_connectSuccessful = false;
      console.log('Connecting to ' + address);
      self.socket = new WebSocket(address);
      self.socket.binaryType = 'arraybuffer';
      self.socket.onmessage = MessageHandler;
      self.socket.onerror = function() {
        console.log('socket error');
      };
    }
    function GetBuffer(size) {
      return new DataView(new ArrayBuffer(size));
    }
    function MessageHandler(data) {
      Receive(new DataView(data.data));
    }
    function Receive(data) {
      function __unmatched_192() {
        for (var string = '';;) {
          var char = data.getUint16(pos, true);
          pos += 2;
          if (0 == char) {
            break;
          }
          string += String.fromCharCode(char);
        }
        return string;
      }
      var pos = 0;
      if (240 == data.getUint8(pos)) {
        pos += 5;
      }
      switch (data.getUint8(pos++)) {
        case 16:
          ParseCellUpdates(data, pos);
          break;
        case 17:
          g_viewX_ = data.getFloat32(pos, true);
          pos += 4;
          g_viewY_ = data.getFloat32(pos, true);
          pos += 4;
          g_scale_ = data.getFloat32(pos, true);
          pos += 4;
          break;
        case 20:
          g_playerCells = [];
          g_playerCellIds = [];
          break;
        case 21:
          g_linesY_ = data.getInt16(pos, true);
          pos += 2;
          g_linesX_ = data.getInt16(pos, true);
          pos += 2;
          if (!g_ready) {
            g_ready = true;
            g_linesX = g_linesY_;
            g_linesY = g_linesX_;
          }
          break;
        case 32:
          g_playerCellIds.push(data.getUint32(pos, true));
          pos += 4;
          break;
        case 49:
          if (null != g_scorePartitions) {
            break;
          }
          var num = data.getUint32(pos, true);
          var pos = pos + 4;
          g_scoreEntries = [];
          for (var i = 0; i < num; ++i) {
            var id = data.getUint32(pos, true);
            var pos = pos + 4;
            g_scoreEntries.push({
              id: id,
              name: __unmatched_192()
            });
          }
          UpdateLeaderboard();
          break;
        case 50:
          g_scorePartitions = [];
          num = data.getUint32(pos, true);
          pos += 4;
          for (i = 0; i < num; ++i) {
            g_scorePartitions.push(data.getFloat32(pos, true));
            pos += 4;
          }
          UpdateLeaderboard();
          break;
        case 64:
          g_minX = data.getFloat64(pos, true);
          pos += 8;
          g_minY = data.getFloat64(pos, true);
          pos += 8;
          g_maxX = data.getFloat64(pos, true);
          pos += 8;
          g_maxY = data.getFloat64(pos, true);
          pos += 8;
          g_viewX_ = (g_maxX + g_minX) / 2;
          g_viewY_ = (g_maxY + g_minY) / 2;
          g_scale_ = 1;
          if (0 == g_playerCells.length) {
            g_viewX = g_viewX_;
            g_viewY = g_viewY_;
            g_scale = g_scale_;
          }
          break;
        case 81:
          var x = data.getUint32(pos, true);
          var pos = pos + 4;
          var __unmatched_198 = data.getUint32(pos, true);
          var pos = pos + 4;
          var __unmatched_199 = data.getUint32(pos, true);
          var pos = pos + 4;
          setTimeout(function() {
            __unmatched_44({
              e: x,
              f: __unmatched_198,
              d: __unmatched_199
            });
          }, 1200);
      }
    }
    function ParseCellUpdates(data, pos) {
      function __unmatched_204() {
        for (var string = '';;) {
          var id = data.getUint16(pos, true);
          pos += 2;
          if (0 == id) {
            break;
          }
          string += String.fromCharCode(id);
        }
        return string;
      }
      function __unmatched_205() {
        for (var __unmatched_220 = '';;) {
          var r = data.getUint8(pos++);
          if (0 == r) {
            break;
          }
          __unmatched_220 += String.fromCharCode(r);
        }
        return __unmatched_220;
      }
      __unmatched_108 = g_time = Date.now();
      if (!g_connectSuccessful) {
        g_connectSuccessful = true;
        __unmatched_25();
      }
      __unmatched_89 = false;
      var num = data.getUint16(pos, true);
      pos += 2;
      for (var i = 0; i < num; ++i) {
        var cellA = g_cellsById[data.getUint32(pos, true)];
        var cellB = g_cellsById[data.getUint32(pos + 4, true)];
        pos += 8;
        if (cellA && cellB) {
          cellB.X();
          cellB.s = cellB.x;
          cellB.t = cellB.y;
          cellB.r = cellB.size;
          cellB.J = cellA.x;
          cellB.K = cellA.y;
          cellB.q = cellB.size;
          cellB.Q = g_time;
          __unmatched_50(cellA, cellB);
        }
      }
      for (i = 0;;) {
        num = data.getUint32(pos, true);
        pos += 4;
        if (0 == num) {
          break;
        }
        ++i;
        var size;
        var cellA = data.getInt32(pos, true);
        pos += 4;
        cellB = data.getInt32(pos, true);
        pos += 4;
        size = data.getInt16(pos, true);
        pos += 2;
        var flags = data.getUint8(pos++);
        var y = data.getUint8(pos++);
        var b = data.getUint8(pos++);
        var y = __unmatched_41(flags << 16 | y << 8 | b);
        var b = data.getUint8(pos++);
        var isVirus = !!(b & 1);
        var isAgitated = !!(b & 16);
        var __unmatched_216 = null;
        if (b & 2) {
          pos += 4 + data.getUint32(pos, true);
        }
        if (b & 4) {
          __unmatched_216 = __unmatched_205();
        }
        var name = __unmatched_204();
        var flags = null;
        if (g_cellsById.hasOwnProperty(num)) {
          flags = g_cellsById[num];
          flags.P();
          flags.s = flags.x;
          flags.t = flags.y;
          flags.r = flags.size;
          flags.color = y;
        } else {
          flags = new Cell(num, cellA, cellB, size, y, name);
          g_cells.push(flags);
          g_cellsById[num] = flags;
          flags.ta = cellA;
          flags.ua = cellB;
        }
        flags.h = isVirus;
        flags.n = isAgitated;
        flags.J = cellA;
        flags.K = cellB;
        flags.q = size;
        flags.Q = g_time;
        flags.ba = b;
        flags.fa = __unmatched_216;
        if (name) {
          flags.B(name);
        }
        if (-1 != g_playerCellIds.indexOf(num) && -1 == g_playerCells.indexOf(flags)) {
          g_playerCells.push(flags);
          if (1 == g_playerCells.length) {
            g_viewX = flags.x;
            g_viewY = flags.y;
            __unmatched_137();
            document.getElementById('overlays').style.display = 'none';
            cached = [];
            __unmatched_140 = 0;
            __unmatched_141 = g_playerCells[0].color;
            __unmatched_143 = true;
            __unmatched_144 = Date.now();
            g_mode = __unmatched_147 = __unmatched_146 = 0;
          }
        }
      }
      cellA = data.getUint32(pos, true);
      pos += 4;
      for (i = 0; i < cellA; i++) {
        num = data.getUint32(pos, true);
        pos += 4;
        flags = g_cellsById[num];
        if (null != flags) {
          flags.X();
        }
      }
      if (__unmatched_89 && 0 == g_playerCells.length) {
        __unmatched_145 = Date.now();
        __unmatched_143 = false;
        if (!(g_playerCellDestroyed || __unmatched_142)) {
          if (__unmatched_149) {
            __unmatched_13(window.ab);
            ShowOverlay();
            __unmatched_142 = true;
            $('#overlays').fadeIn(3000);
            $('#stats').show();
          }
        }
      }
    }
    function __unmatched_25() {
      $('#connecting').hide();
      SendNick();
      if (__unmatched_122) {
        __unmatched_122();
        __unmatched_122 = null;
      }
      if (null != __unmatched_124) {
        clearTimeout(__unmatched_124);
      }
      __unmatched_124 = setTimeout(function() {
        if (window.ga) {
          ++__unmatched_125;
          window.ga('set', 'dimension2', __unmatched_125);
        }
      }, 10000);
    }
    function IsConnected() {
      return null != self.socket && self.socket.readyState == self.socket.OPEN;
    }
    function ResizeHandler() {
      g_protocol = 1 * window.innerWidth;
      __unmatched_61 = 1 * window.innerHeight;
      g_canvas_.width = g_canvas.width = g_protocol;
      g_canvas_.height = g_canvas.height = __unmatched_61;
      var $dialog = $('#helloContainer');
      $dialog.css('transform', 'none');
      var dialogHeight = $dialog.height();
      var height = window.innerHeight;
      if (dialogHeight > height / 1.1) {
        $dialog.css('transform', 'translate(-50%, -50%) scale(' + height / dialogHeight / 1.1 + ')');
      } else {
        $dialog.css('transform', 'translate(-50%, -50%)');
      }
      GetScore();
    }
    function ScaleModifier() {
      var scale;
      scale = 1 * Math.max(__unmatched_61 / 1080, g_protocol / 1920);
      return scale *= g_zoom;
    }
    function __unmatched_33() {
      if (0 != g_playerCells.length) {
        for (var scale = 0, i = 0; i < g_playerCells.length; i++) {
          scale += g_playerCells[i].size;
        }
        scale = Math.pow(Math.min(64 / scale, 1), 0.4) * ScaleModifier();
        g_scale = (9 * g_scale + scale) / 10;
      }
    }
    function GetScore() {
      var x;
      var time = Date.now();
      ++__unmatched_76;
      g_time = time;
      if (0 < g_playerCells.length) {
        __unmatched_33();
        for (var y = x = 0, i = 0; i < g_playerCells.length; i++) {
          g_playerCells[i].P();
          x += g_playerCells[i].x / g_playerCells.length;
          y += g_playerCells[i].y / g_playerCells.length;
        }
        g_viewX_ = x;
        g_viewY_ = y;
        g_scale_ = g_scale;
        g_viewX = (g_viewX + x) / 2;
        g_viewY = (g_viewY + y) / 2;
      } else {
        g_viewX = (29 * g_viewX + g_viewX_) / 30;
        g_viewY = (29 * g_viewY + g_viewY_) / 30;
        g_scale = (9 * g_scale + g_scale_ * ScaleModifier()) / 10;
      }
      UpdateTree();
      UpdatePos();
      if (!g_showTrails) {
        g_context.clearRect(0, 0, g_protocol, __unmatched_61);
      }
      if (g_showTrails) {
        g_context.fillStyle = g_showMass ? '#111111' : '#F2FBFF';
        g_context.globalAlpha = 0.05;
        g_context.fillRect(0, 0, g_protocol, __unmatched_61);
        g_context.globalAlpha = 1;
      } else {
        DrawGrid();
      }
      g_cells.sort(function(A, B) {
        return A.size == B.size ? A.id - B.id : A.size - B.size;
      });
      g_context.save();
      g_context.translate(g_protocol / 2, __unmatched_61 / 2);
      g_context.scale(g_scale, g_scale);
      g_context.translate(-g_viewX, -g_viewY);
      for (i = 0; i < g_destroyedCells.length; i++) {
        g_destroyedCells[i].w(g_context);
      }
      for (i = 0; i < g_cells.length; i++) {
        g_cells[i].w(g_context);
      }
      if (g_ready) {
        g_linesX = (3 * g_linesX + g_linesY_) / 4;
        g_linesY = (3 * g_linesY + g_linesX_) / 4;
        g_context.save();
        g_context.strokeStyle = '#FFAAAA';
        g_context.lineWidth = 10;
        g_context.lineCap = 'round';
        g_context.lineJoin = 'round';
        g_context.globalAlpha = 0.5;
        g_context.beginPath();
        for (i = 0; i < g_playerCells.length; i++) {
          g_context.moveTo(g_playerCells[i].x, g_playerCells[i].y);
          g_context.lineTo(g_linesX, g_linesY);
        }
        g_context.stroke();
        g_context.restore();
      }
      g_context.restore();
      if (g_leaderboardCanvas && g_leaderboardCanvas.width) {
        g_context.drawImage(g_leaderboardCanvas, g_protocol - g_leaderboardCanvas.width - 10, 10);
      }
      g_maxScore = Math.max(g_maxScore, __unmatched_37());
      if (0 != g_maxScore) {
        if (null == g_cachedScore) {
          g_cachedScore = new CachedCanvas(24, '#FFFFFF');
        }
        g_cachedScore.C(__unmatched_15('score') + ': ' + ~~(g_maxScore / 100));
        y = g_cachedScore.L();
        x = y.width;
        g_context.globalAlpha = 0.2;
        g_context.fillStyle = '#000000';
        g_context.fillRect(10, __unmatched_61 - 10 - 24 - 10, x + 10, 34);
        g_context.globalAlpha = 1;
        g_context.drawImage(y, 15, __unmatched_61 - 10 - 24 - 5);
      }
      DrawSplitImage();
      time = Date.now() - time;
      if (time > 1000 / 60) {
        g_pointNumScale -= 0.01;
      } else if (time < 1000 / 65) {
        g_pointNumScale += 0.01;
      }
      if (0.4 > g_pointNumScale) {
        g_pointNumScale = 0.4;
      }
      if (1 < g_pointNumScale) {
        g_pointNumScale = 1;
      }
      time = g_time - __unmatched_78;
      if (!IsConnected() || g_playerCellDestroyed || __unmatched_142) {
        qkeyDown += time / 2000;
        if (1 < qkeyDown) {
          qkeyDown = 1;
        }
      } else {
        qkeyDown -= time / 300;
        if (0 > qkeyDown) {
          qkeyDown = 0;
        }
      }
      if (0 < qkeyDown) {
        g_context.fillStyle = '#000000';
        g_context.globalAlpha = 0.5 * qkeyDown;
        g_context.fillRect(0, 0, g_protocol, __unmatched_61);
        g_context.globalAlpha = 1;
      }
      __unmatched_78 = g_time;
    }
    function DrawGrid() {
      g_context.fillStyle = g_showMass ? '#111111' : '#F2FBFF';
      g_context.fillRect(0, 0, g_protocol, __unmatched_61);
      g_context.save();
      g_context.strokeStyle = g_showMass ? '#AAAAAA' : '#000000';
      g_context.globalAlpha = 0.2 * g_scale;
      for (var width = g_protocol / g_scale, height = __unmatched_61 / g_scale, g_width = (-g_viewX + width / 2) % 50; g_width < width; g_width += 50) {
        g_context.beginPath();
        g_context.moveTo(g_width * g_scale - 0.5, 0);
        g_context.lineTo(g_width * g_scale - 0.5, height * g_scale);
        g_context.stroke();
      }
      for (g_width = (-g_viewY + height / 2) % 50; g_width < height; g_width += 50) {
        g_context.beginPath();
        g_context.moveTo(0, g_width * g_scale - 0.5);
        g_context.lineTo(width * g_scale, g_width * g_scale - 0.5);
        g_context.stroke();
      }
      g_context.restore();
    }
    function DrawSplitImage() {
      if (g_touchCapable && g_splitImage.width) {
        var size = g_protocol / 5;
        g_context.drawImage(g_splitImage, 5, 5, size, size);
      }
    }
    function __unmatched_37() {
      for (var score = 0, i = 0; i < g_playerCells.length; i++) {
        score += g_playerCells[i].q * g_playerCells[i].q;
      }
      return score;
    }
    function UpdateLeaderboard() {
      g_leaderboardCanvas = null;
      if (null != g_scorePartitions || 0 != g_scoreEntries.length) {
        if (null != g_scorePartitions || g_showNames) {
          g_leaderboardCanvas = document.createElement('canvas');
          var context = g_leaderboardCanvas.getContext('2d');
          var height = 60;
          var height = null == g_scorePartitions ? height + 24 * g_scoreEntries.length : height + 180;
          var scale = Math.min(200, 0.3 * g_protocol) / 200;
          g_leaderboardCanvas.width = 200 * scale;
          g_leaderboardCanvas.height = height * scale;
          context.scale(scale, scale);
          context.globalAlpha = 0.4;
          context.fillStyle = '#000000';
          context.fillRect(0, 0, 200, height);
          context.globalAlpha = 1;
          context.fillStyle = '#FFFFFF';
          scale = null;
          scale = __unmatched_15('leaderboard');
          context.font = '30px Ubuntu';
          context.fillText(scale, 100 - context.measureText(scale).width / 2, 40);
          if (null == g_scorePartitions) {
            for (context.font = '20px Ubuntu', height = 0; height < g_scoreEntries.length; ++height) {
              scale = g_scoreEntries[height].name || __unmatched_15('unnamed_cell');
              if (!g_showNames) {
                scale = __unmatched_15('unnamed_cell');
              }
              if (-1 != g_playerCellIds.indexOf(g_scoreEntries[height].id)) {
                if (g_playerCells[0].name) {
                  scale = g_playerCells[0].name;
                }
                context.fillStyle = '#FFAAAA';
              } else {
                context.fillStyle = '#FFFFFF';
              }
              scale = height + 1 + '. ' + scale;
              context.fillText(scale, 100 - context.measureText(scale).width / 2, 70 + 24 * height);
            }
          } else {
            for (height = scale = 0; height < g_scorePartitions.length; ++height) {
              var end = scale + g_scorePartitions[height] * Math.PI * 2;
              context.fillStyle = g_teamColors[height + 1];
              context.beginPath();
              context.moveTo(100, 140);
              context.arc(100, 140, 80, scale, end, false);
              context.fill();
              scale = end;
            }
          }
        }
      }
    }
    function __unmatched_39(val, __unmatched_253, __unmatched_254, __unmatched_255, __unmatched_256) {
      this.V = val;
      this.x = __unmatched_253;
      this.y = __unmatched_254;
      this.i = __unmatched_255;
      this.b = __unmatched_256;
    }
    function Cell(id, x, y, size, color, name) {
      this.id = id;
      this.s = this.x = x;
      this.t = this.y = y;
      this.r = this.size = size;
      this.color = color;
      this.a = [];
      this.W();
      this.B(name);
    }
    function __unmatched_41(__unmatched_263) {
      for (__unmatched_263 = __unmatched_263.toString(16); 6 > __unmatched_263.length;) {
        __unmatched_263 = '0' + __unmatched_263;
      }
      return '#' + __unmatched_263;
    }
    function CachedCanvas(size, color, stroke, strokeColor) {
      if (size) {
        this.u = size;
      }
      if (color) {
        this.S = color;
      }
      this.U = !!stroke;
      if (strokeColor) {
        this.v = strokeColor;
      }
    }
    function __unmatched_43(__unmatched_268) {
      for (var size_ = __unmatched_268.length, __unmatched_270, __unmatched_271; 0 < size_;) {
        __unmatched_271 = Math.floor(Math.random() * size_);
        size_--;
        __unmatched_270 = __unmatched_268[size_];
        __unmatched_268[size_] = __unmatched_268[__unmatched_271];
        __unmatched_268[__unmatched_271] = __unmatched_270;
      }
    }
    function __unmatched_44(g_socket, __unmatched_273) {
      var noClip = '1' == $('#helloContainer').attr('data-has-account-data');
      $('#helloContainer').attr('data-has-account-data', '1');
      if (null == __unmatched_273 && window.localStorage.loginCache) {
        var rand = JSON.parse(window.localStorage.loginCache);
        rand.f = g_socket.f;
        rand.d = g_socket.d;
        rand.e = g_socket.e;
        window.localStorage.loginCache = JSON.stringify(rand);
      }
      if (noClip) {
        var __unmatched_276 = +$('.agario-exp-bar .progress-bar-text').first().text().split('/')[0];
        var noClip = +$('.agario-exp-bar .progress-bar-text').first().text().split('/')[1].split(' ')[0];
        var rand = $('.agario-profile-panel .progress-bar-star').first().text();
        if (rand != g_socket.e) {
          __unmatched_44({
            f: noClip,
            d: noClip,
            e: rand
          }, function() {
            $('.agario-profile-panel .progress-bar-star').text(g_socket.e);
            $('.agario-exp-bar .progress-bar').css('width', '100%');
            $('.progress-bar-star').addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
              $('.progress-bar-star').removeClass('animated tada');
            });
            setTimeout(function() {
              $('.agario-exp-bar .progress-bar-text').text(g_socket.d + '/' + g_socket.d + ' XP');
              __unmatched_44({
                f: 0,
                d: g_socket.d,
                e: g_socket.e
              }, function() {
                __unmatched_44(g_socket, __unmatched_273);
              });
            }, 1000);
          });
        } else {
          var __unmatched_277 = Date.now();
          var name = function() {
            var deltaX;
            deltaX = (Date.now() - __unmatched_277) / 1000;
            deltaX = 0 > deltaX ? 0 : 1 < deltaX ? 1 : deltaX;
            deltaX = deltaX * deltaX * (3 - 2 * deltaX);
            $('.agario-exp-bar .progress-bar-text').text(~~(__unmatched_276 + (g_socket.f - __unmatched_276) * deltaX) + '/' + g_socket.d + ' XP');
            $('.agario-exp-bar .progress-bar').css('width', (88 * (__unmatched_276 + (g_socket.f - __unmatched_276) * deltaX) / g_socket.d).toFixed(2) + '%');
            if (1 > deltaX) {
              window.requestAnimationFrame(name);
            } else if (__unmatched_273) {
              __unmatched_273();
            }
          };
          window.requestAnimationFrame(name);
        }
      } else {
        $('.agario-profile-panel .progress-bar-star').text(g_socket.e);
        $('.agario-exp-bar .progress-bar-text').text(g_socket.f + '/' + g_socket.d + ' XP');
        $('.agario-exp-bar .progress-bar').css('width', (88 * g_socket.f / g_socket.d).toFixed(2) + '%');
        if (__unmatched_273) {
          __unmatched_273();
        }
      }
    }
    function __unmatched_45(__unmatched_280) {
      if ('string' == typeof __unmatched_280) {
        __unmatched_280 = JSON.parse(__unmatched_280);
      }
      if (Date.now() + 1800000 > __unmatched_280.ka) {
        $('#helloContainer').attr('data-logged-in', '0');
      } else {
        window.localStorage.loginCache = JSON.stringify(__unmatched_280);
        __unmatched_109 = __unmatched_280.ha;
        $('.agario-profile-name').text(__unmatched_280.name);
        RefreshAds();
        __unmatched_44({
          f: __unmatched_280.f,
          d: __unmatched_280.d,
          e: __unmatched_280.e
        });
        $('#helloContainer').attr('data-logged-in', '1');
      }
    }
    function __unmatched_46(data) {
      data = data.split('\n');
      __unmatched_45({
        name: data[0],
        sa: data[1],
        ha: data[2],
        ka: 1000 * +data[3],
        e: +data[4],
        f: +data[5],
        d: +data[6]
      });
    }
    function UpdateScale(__unmatched_282) {
      if ('connected' == __unmatched_282.status) {
        var y = __unmatched_282.authResponse.accessToken;
        console.log(y);
        window.FB.api('/me/picture?width=180&height=180', function(__unmatched_284) {
          window.localStorage.fbPictureCache = __unmatched_284.data.url;
          $('.agario-profile-picture').attr('src', __unmatched_284.data.url);
        });
        $('#helloContainer').attr('data-logged-in', '1');
        if (null != __unmatched_109) {
          $.ajax('https://m.agar.io/checkToken', {
            error: function() {
              __unmatched_109 = null;
              UpdateScale(__unmatched_282);
            },
            success: function(__unmatched_285) {
              __unmatched_285 = __unmatched_285.split('\n');
              __unmatched_44({
                e: +__unmatched_285[0],
                f: +__unmatched_285[1],
                d: +__unmatched_285[2]
              });
            },
            dataType: 'text',
            method: 'POST',
            cache: false,
            crossDomain: true,
            data: __unmatched_109
          });
        } else {
          $.ajax('https://m.agar.io/facebookLogin', {
            error: function() {
              __unmatched_109 = null;
              $('#helloContainer').attr('data-logged-in', '0');
            },
            success: __unmatched_46,
            dataType: 'text',
            method: 'POST',
            cache: false,
            crossDomain: true,
            data: y
          });
        }
      }
    }

    function __unmatched_49(__unmatched_288) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, window.document.title, __unmatched_288);
      }
    }
    function __unmatched_50(__unmatched_289, __unmatched_290) {
      var playerOwned = -1 != g_playerCellIds.indexOf(__unmatched_289.id);
      var __unmatched_292 = -1 != g_playerCellIds.indexOf(__unmatched_290.id);
      var __unmatched_293 = 30 > __unmatched_290.size;
      if (playerOwned && __unmatched_293) {
        ++__unmatched_140;
      }
      if (!(__unmatched_293 || !playerOwned || __unmatched_292)) {
        ++__unmatched_147;
      }
    }
    function __unmatched_51(__unmatched_294) {
      __unmatched_294 = ~~__unmatched_294;
      var color = (__unmatched_294 % 60).toString();
      __unmatched_294 = (~~(__unmatched_294 / 60)).toString();
      if (2 > color.length) {
        color = '0' + color;
      }
      return __unmatched_294 + ':' + color;
    }
    function __unmatched_52() {
      if (null == g_scoreEntries) {
        return 0;
      }
      for (var i = 0; i < g_scoreEntries.length; ++i) {
        if (-1 != g_playerCellIds.indexOf(g_scoreEntries[i].id)) {
          return i + 1;
        }
      }
      return 0;
    }
    function ShowOverlay() {
      $('.stats-food-eaten').text(__unmatched_140);
      $('.stats-time-alive').text(__unmatched_51((__unmatched_145 - __unmatched_144) / 1000));
      $('.stats-leaderboard-time').text(__unmatched_51(__unmatched_146));
      $('.stats-highest-mass').text(~~(g_maxScore / 100));
      $('.stats-cells-eaten').text(__unmatched_147);
      $('.stats-top-position').text(0 == g_mode ? ':(' : g_mode);
      var g_height = document.getElementById('statsGraph');
      if (g_height) {
        var pointsAcc = g_height.getContext('2d');
        var scale = g_height.width;
        var g_height = g_height.height;
        pointsAcc.clearRect(0, 0, scale, g_height);
        if (2 < cached.length) {
          for (var __unmatched_300 = 200, i = 0; i < cached.length; i++) {
            __unmatched_300 = Math.max(cached[i], __unmatched_300);
          }
          pointsAcc.lineWidth = 3;
          pointsAcc.lineCap = 'round';
          pointsAcc.lineJoin = 'round';
          pointsAcc.strokeStyle = __unmatched_141;
          pointsAcc.fillStyle = __unmatched_141;
          pointsAcc.beginPath();
          pointsAcc.moveTo(0, g_height - cached[0] / __unmatched_300 * (g_height - 10) + 10);
          for (i = 1; i < cached.length; i += Math.max(~~(cached.length / scale), 1)) {
            for (var __unmatched_302 = i / (cached.length - 1) * scale, __unmatched_303 = [], __unmatched_304 = -20; 20 >= __unmatched_304; ++__unmatched_304) {
              if (!(0 > i + __unmatched_304 || i + __unmatched_304 >= cached.length)) {
                __unmatched_303.push(cached[i + __unmatched_304]);
              }
            }
            __unmatched_303 = __unmatched_303.reduce(function(__unmatched_305, __unmatched_306) {
                return __unmatched_305 + __unmatched_306;
              }) / __unmatched_303.length / __unmatched_300;
            pointsAcc.lineTo(__unmatched_302, g_height - __unmatched_303 * (g_height - 10) + 10);
          }
          pointsAcc.stroke();
          pointsAcc.globalAlpha = 0.5;
          pointsAcc.lineTo(scale, g_height);
          pointsAcc.lineTo(0, g_height);
          pointsAcc.fill();
          pointsAcc.globalAlpha = 1;
        }
      }
    }
    if (!window.agarioNoInit) {
      var __unmatched_54 = window.location.protocol;
      var items = window.navigator.userAgent;
      if (-1 != items.indexOf('Android')) {
        if (window.ga) {
          window.ga('send', 'event', 'MobileRedirect', 'PlayStore');
        }
        setTimeout(function() {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.miniclip.agar.io';
        }, 1000);
      } else if (-1 != items.indexOf('iPhone') || -1 != items.indexOf('iPad') || -1 != items.indexOf('iPod')) {
        if (window.ga) {
          window.ga('send', 'event', 'MobileRedirect', 'AppStore');
        }
        setTimeout(function() {
          window.location.href = 'https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp';
        }, 1000);
      } else {
        var g_canvas_;
        var g_context;
        var g_canvas;
        var g_protocol;
        var __unmatched_61;
        var g_pointTree = null;
        var g_viewX = 0;
        var g_viewY = 0;
        var g_playerCellIds = [];
        var g_playerCells = [];
        var g_cellsById = {};
        var g_cells = [];
        var g_destroyedCells = [];
        var g_scoreEntries = [];
        var g_mouseX = 0;
        var g_mouseY = 0;
        var g_moveX = -1;
        var g_moveY = -1;
        var __unmatched_76 = 0;
        var g_time = 0;
        var __unmatched_78 = 0;
        var g_nick = null;
        var g_minX = 0;
        var g_minY = 0;
        var g_maxX = 10000;
        var g_maxY = 10000;
        var g_scale = 1;
        var g_region = null;
        var g_showSkins = true;
        var g_showNames = true;
        var g_noColors = false;
        var __unmatched_89 = false;
        var g_maxScore = 0;
        var g_showMass = false;
        var g_darkTheme = false;
        var g_viewX_ = g_viewX = ~~((g_minX + g_maxX) / 2);
        var g_viewY_ = g_viewY = ~~((g_minY + g_maxY) / 2);
        var g_scale_ = 1;
        var __unmatched_96 = '';
        var g_scorePartitions = null;
        var g_drawLines = false;
        var g_ready = false;
        var g_linesY_ = 0;
        var g_linesX_ = 0;
        var g_linesX = 0;
        var g_linesY = 0;
        var g_ABGroup = 0;
        var g_teamColors = [
          '#333333',
          '#FF3333',
          '#33FF33',
          '#3333FF'
        ];
        var g_showTrails = false;
        var g_connectSuccessful = false;
        var __unmatched_108 = 0;
        var __unmatched_109 = null;
        var g_zoom = 1;
        var qkeyDown = 1;
        var g_playerCellDestroyed = false;
        var __unmatched_113 = 0;
        var __unmatched_114 = {};
        (function() {
          var point = window.location.search;
          if ('?' == point.charAt(0)) {
            point = point.slice(1);
          }
          for (var point = point.split('&'), __unmatched_308 = 0; __unmatched_308 < point.length; __unmatched_308++) {
            var parts = point[__unmatched_308].split('=');
            __unmatched_114[parts[0]] = parts[1];
          }
        }());
        var g_touchCapable = 'ontouchstart' in window && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
        var g_splitImage = new Image();
        g_splitImage.src = 'img/split.png';
        var canvasTest = document.createElement('canvas');
        if ('undefined' == typeof console || 'undefined' == typeof DataView || 'undefined' == typeof WebSocket || null == canvasTest || null == canvasTest.getContext || null == window.localStorage) {
          alert('You browser does not support this game, we recommend you to use Firefox to play this');
        } else {
          var g_regionLabels = null;
          window.setNick = function(__unmatched_310) {
            if (window.ga) {
              window.ga('send', 'event', 'Nick', __unmatched_310.toLowerCase());
            }
            HideOverlay();
            g_nick = __unmatched_310;
            SendNick();
            g_maxScore = 0;
          };
          window.setRegion = SetRegion;
          window.setSkins = function(val) {
            g_showSkins = val;
          };
          window.setNames = function(val) {
            g_showNames = val;
          };
          window.setDarkTheme = function(val) {
            g_showMass = val;
          };
          window.setColors = function(val) {
            g_noColors = val;
          };
          window.setShowMass = function(val) {
            g_darkTheme = val;
          };
          window.spectate = function() {
            g_nick = null;
            SendCmd(1);
            HideOverlay();
          };
          window.setGameMode = function(val) {
            if (val != __unmatched_96) {
              if (':party' == __unmatched_96) {
                $('#helloContainer').attr('data-party-state', '0');
              }
              Render(val);
              if (':party' != val) {
                Start();
              }
            }
          };
          window.setAcid = function(val) {
            g_showTrails = val;
          };
          if (null != window.localStorage) {
            if (null == window.localStorage.AB9) {
              window.localStorage.AB9 = 0 + ~~(100 * Math.random());
            }
            g_ABGroup = +window.localStorage.AB9;
            window.ABGroup = g_ABGroup;
          }
          $.get(__unmatched_54 + '//gc.agar.io', function(code) {
            var __unmatched_319 = code.split(' ');
            code = __unmatched_319[0];
            __unmatched_319 = __unmatched_319[1] || '';
            if (-1 == ['UA'].indexOf(code)) {
              g_skinNamesA.push('ussr');
            }
            if (g_regionsByCC.hasOwnProperty(code)) {
              if ('string' == typeof g_regionsByCC[code]) {
                if (!g_region) {
                  SetRegion(g_regionsByCC[code]);
                } else if (g_regionsByCC[code].hasOwnProperty(__unmatched_319)) {
                  if (!g_region) {
                    SetRegion(g_regionsByCC[code][__unmatched_319]);
                  }
                }
              }
            }
          }, 'text');
          var g_canRefreshAds = true;
          var g_refreshAdsCooldown = 0;
          var g_regionsByCC = {
            AF: 'JP-Tokyo',
            AX: 'EU-London',
            AL: 'EU-London',
            DZ: 'EU-London',
            AS: 'SG-Singapore',
            AD: 'EU-London',
            AO: 'EU-London',
            AI: 'US-Atlanta',
            AG: 'US-Atlanta',
            AR: 'BR-Brazil',
            AM: 'JP-Tokyo',
            AW: 'US-Atlanta',
            AU: 'SG-Singapore',
            AT: 'EU-London',
            AZ: 'JP-Tokyo',
            BS: 'US-Atlanta',
            BH: 'JP-Tokyo',
            BD: 'JP-Tokyo',
            BB: 'US-Atlanta',
            BY: 'EU-London',
            BE: 'EU-London',
            BZ: 'US-Atlanta',
            BJ: 'EU-London',
            BM: 'US-Atlanta',
            BT: 'JP-Tokyo',
            BO: 'BR-Brazil',
            BQ: 'US-Atlanta',
            BA: 'EU-London',
            BW: 'EU-London',
            BR: 'BR-Brazil',
            IO: 'JP-Tokyo',
            VG: 'US-Atlanta',
            BN: 'JP-Tokyo',
            BG: 'EU-London',
            BF: 'EU-London',
            BI: 'EU-London',
            KH: 'JP-Tokyo',
            CM: 'EU-London',
            CA: 'US-Atlanta',
            CV: 'EU-London',
            KY: 'US-Atlanta',
            CF: 'EU-London',
            TD: 'EU-London',
            CL: 'BR-Brazil',
            CN: 'CN-China',
            CX: 'JP-Tokyo',
            CC: 'JP-Tokyo',
            CO: 'BR-Brazil',
            KM: 'EU-London',
            CD: 'EU-London',
            CG: 'EU-London',
            CK: 'SG-Singapore',
            CR: 'US-Atlanta',
            CI: 'EU-London',
            HR: 'EU-London',
            CU: 'US-Atlanta',
            CW: 'US-Atlanta',
            CY: 'JP-Tokyo',
            CZ: 'EU-London',
            DK: 'EU-London',
            DJ: 'EU-London',
            DM: 'US-Atlanta',
            DO: 'US-Atlanta',
            EC: 'BR-Brazil',
            EG: 'EU-London',
            SV: 'US-Atlanta',
            GQ: 'EU-London',
            ER: 'EU-London',
            EE: 'EU-London',
            ET: 'EU-London',
            FO: 'EU-London',
            FK: 'BR-Brazil',
            FJ: 'SG-Singapore',
            FI: 'EU-London',
            FR: 'EU-London',
            GF: 'BR-Brazil',
            PF: 'SG-Singapore',
            GA: 'EU-London',
            GM: 'EU-London',
            GE: 'JP-Tokyo',
            DE: 'EU-London',
            GH: 'EU-London',
            GI: 'EU-London',
            GR: 'EU-London',
            GL: 'US-Atlanta',
            GD: 'US-Atlanta',
            GP: 'US-Atlanta',
            GU: 'SG-Singapore',
            GT: 'US-Atlanta',
            GG: 'EU-London',
            GN: 'EU-London',
            GW: 'EU-London',
            GY: 'BR-Brazil',
            HT: 'US-Atlanta',
            VA: 'EU-London',
            HN: 'US-Atlanta',
            HK: 'JP-Tokyo',
            HU: 'EU-London',
            IS: 'EU-London',
            IN: 'JP-Tokyo',
            ID: 'JP-Tokyo',
            IR: 'JP-Tokyo',
            IQ: 'JP-Tokyo',
            IE: 'EU-London',
            IM: 'EU-London',
            IL: 'JP-Tokyo',
            IT: 'EU-London',
            JM: 'US-Atlanta',
            JP: 'JP-Tokyo',
            JE: 'EU-London',
            JO: 'JP-Tokyo',
            KZ: 'JP-Tokyo',
            KE: 'EU-London',
            KI: 'SG-Singapore',
            KP: 'JP-Tokyo',
            KR: 'JP-Tokyo',
            KW: 'JP-Tokyo',
            KG: 'JP-Tokyo',
            LA: 'JP-Tokyo',
            LV: 'EU-London',
            LB: 'JP-Tokyo',
            LS: 'EU-London',
            LR: 'EU-London',
            LY: 'EU-London',
            LI: 'EU-London',
            LT: 'EU-London',
            LU: 'EU-London',
            MO: 'JP-Tokyo',
            MK: 'EU-London',
            MG: 'EU-London',
            MW: 'EU-London',
            MY: 'JP-Tokyo',
            MV: 'JP-Tokyo',
            ML: 'EU-London',
            MT: 'EU-London',
            MH: 'SG-Singapore',
            MQ: 'US-Atlanta',
            MR: 'EU-London',
            MU: 'EU-London',
            YT: 'EU-London',
            MX: 'US-Atlanta',
            FM: 'SG-Singapore',
            MD: 'EU-London',
            MC: 'EU-London',
            MN: 'JP-Tokyo',
            ME: 'EU-London',
            MS: 'US-Atlanta',
            MA: 'EU-London',
            MZ: 'EU-London',
            MM: 'JP-Tokyo',
            NA: 'EU-London',
            NR: 'SG-Singapore',
            NP: 'JP-Tokyo',
            NL: 'EU-London',
            NC: 'SG-Singapore',
            NZ: 'SG-Singapore',
            NI: 'US-Atlanta',
            NE: 'EU-London',
            NG: 'EU-London',
            NU: 'SG-Singapore',
            NF: 'SG-Singapore',
            MP: 'SG-Singapore',
            NO: 'EU-London',
            OM: 'JP-Tokyo',
            PK: 'JP-Tokyo',
            PW: 'SG-Singapore',
            PS: 'JP-Tokyo',
            PA: 'US-Atlanta',
            PG: 'SG-Singapore',
            PY: 'BR-Brazil',
            PE: 'BR-Brazil',
            PH: 'JP-Tokyo',
            PN: 'SG-Singapore',
            PL: 'EU-London',
            PT: 'EU-London',
            PR: 'US-Atlanta',
            QA: 'JP-Tokyo',
            RE: 'EU-London',
            RO: 'EU-London',
            RU: 'RU-Russia',
            RW: 'EU-London',
            BL: 'US-Atlanta',
            SH: 'EU-London',
            KN: 'US-Atlanta',
            LC: 'US-Atlanta',
            MF: 'US-Atlanta',
            PM: 'US-Atlanta',
            VC: 'US-Atlanta',
            WS: 'SG-Singapore',
            SM: 'EU-London',
            ST: 'EU-London',
            SA: 'EU-London',
            SN: 'EU-London',
            RS: 'EU-London',
            SC: 'EU-London',
            SL: 'EU-London',
            SG: 'JP-Tokyo',
            SX: 'US-Atlanta',
            SK: 'EU-London',
            SI: 'EU-London',
            SB: 'SG-Singapore',
            SO: 'EU-London',
            ZA: 'EU-London',
            SS: 'EU-London',
            ES: 'EU-London',
            LK: 'JP-Tokyo',
            SD: 'EU-London',
            SR: 'BR-Brazil',
            SJ: 'EU-London',
            SZ: 'EU-London',
            SE: 'EU-London',
            CH: 'EU-London',
            SY: 'EU-London',
            TW: 'JP-Tokyo',
            TJ: 'JP-Tokyo',
            TZ: 'EU-London',
            TH: 'JP-Tokyo',
            TL: 'JP-Tokyo',
            TG: 'EU-London',
            TK: 'SG-Singapore',
            TO: 'SG-Singapore',
            TT: 'US-Atlanta',
            TN: 'EU-London',
            TR: 'TK-Turkey',
            TM: 'JP-Tokyo',
            TC: 'US-Atlanta',
            TV: 'SG-Singapore',
            UG: 'EU-London',
            UA: 'EU-London',
            AE: 'EU-London',
            GB: 'EU-London',
            US: 'US-Atlanta',
            UM: 'SG-Singapore',
            VI: 'US-Atlanta',
            UY: 'BR-Brazil',
            UZ: 'JP-Tokyo',
            VU: 'SG-Singapore',
            VE: 'BR-Brazil',
            VN: 'JP-Tokyo',
            WF: 'SG-Singapore',
            EH: 'EU-London',
            YE: 'JP-Tokyo',
            ZM: 'EU-London',
            ZW: 'EU-London'
          };
          var __unmatched_122 = null;
          window.connect = Connect;
          var g_retryTimeout = 500;
          var __unmatched_124 = null;
          var __unmatched_125 = 0;
          var g_lastMoveY = -1;
          var g_lastMoveX = -1;
          var g_leaderboardCanvas = null;
          var g_pointNumScale = 1;
          var g_cachedScore = null;
          var __unmatched_131 = function() {
            var sizeRatio = Date.now();
            var __unmatched_321 = 1000 / 60;
            return function() {
              window.requestAnimationFrame(__unmatched_131);
              var x = Date.now();
              var step = x - sizeRatio;
              if (step > __unmatched_321) {
                sizeRatio = x - step % __unmatched_321;
                if (!IsConnected() || 240 > Date.now() - __unmatched_108) {
                  GetScore();
                } else {
                  console.warn('Skipping draw');
                }
                __unmatched_138();
              }
            };
          }();
          var g_skinCache = {};
          var g_skinNamesA = 'poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump'.split(';');
          var __unmatched_134 = '8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump'.split(';');
          var __unmatched_135 = {};
          __unmatched_39.prototype = {
            V: null,
            x: 0,
            y: 0,
            i: 0,
            b: 0
          };
          Cell.prototype = {
            id: 0,
            a: null,
            name: null,
            o: null,
            O: null,
            x: 0,
            y: 0,
            size: 0,
            s: 0,
            t: 0,
            r: 0,
            J: 0,
            K: 0,
            q: 0,
            ba: 0,
            Q: 0,
            ja: 0,
            G: false,
            h: false,
            n: false,
            R: true,
            Y: 0,
            fa: null,
            X: function() {
              var i;
              for (i = 0; i < g_cells.length; i++) {
                if (g_cells[i] == this) {
                  g_cells.splice(i, 1);
                  break;
                }
              }
              delete g_cellsById[this.id];
              i = g_playerCells.indexOf(this);
              if (-1 != i) {
                __unmatched_89 = true;
                g_playerCells.splice(i, 1);
              }
              i = g_playerCellIds.indexOf(this.id);
              if (-1 != i) {
                g_playerCellIds.splice(i, 1);
              }
              this.G = true;
              if (0 < this.Y) {
                g_destroyedCells.push(this);
              }
            },
            l: function() {
              return Math.max(~~(0.3 * this.size), 24);
            },
            B: function(val) {
              if (this.name = val) {
                if (null == this.o) {
                  this.o = new CachedCanvas(this.l(), '#FFFFFF', true, '#000000');
                } else {
                  this.o.M(this.l());
                }
                this.o.C(this.name);
              }
            },
            W: function() {
              for (var num = this.I(); this.a.length > num;) {
                var i = ~~(Math.random() * this.a.length);
                this.a.splice(i, 1);
              }
              for (0 == this.a.length && 0 < num && this.a.push(new __unmatched_39(this, this.x, this.y, this.size, Math.random() - 0.5)); this.a.length < num;) {
                i = ~~(Math.random() * this.a.length);
                i = this.a[i];
                this.a.push(new __unmatched_39(this, i.x, i.y, i.i, i.b));
              }
            },
            I: function() {
              var num = 10;
              if (20 > this.size) {
                num = 0;
              }
              if (this.h) {
                num = 30;
              }
              var size = this.size;
              if (!this.h) {
                size *= g_scale;
              }
              size *= g_pointNumScale;
              if (this.ba & 32) {
                size *= 0.25;
              }
              return ~~Math.max(size, num);
            },
            qa: function() {
              this.W();
              for (var cell = this.a, num = cell.length, i = 0; i < num; ++i) {
                var prevAcc = cell[(i - 1 + num) % num].b;
                var nextAcc = cell[(i + 1) % num].b;
                cell[i].b += (Math.random() - 0.5) * (this.n ? 3 : 1);
                cell[i].b *= 0.7;
                if (10 < cell[i].b) {
                  cell[i].b = 10;
                }
                if (-10 > cell[i].b) {
                  cell[i].b = -10;
                }
                cell[i].b = (prevAcc + nextAcc + 8 * cell[i].b) / 10;
              }
              for (var thisCell = this, roll = this.h ? 0 : (this.id / 1000 + g_time / 10000) % (2 * Math.PI), i = 0; i < num; ++i) {
                var size = cell[i].i;
                var prevAcc = cell[(i - 1 + num) % num].i;
                var nextAcc = cell[(i + 1) % num].i;
                if (15 < this.size && null != g_pointTree && 20 < this.size * g_scale && 0 < this.id) {
                  var reduce = false;
                  var x = cell[i].x;
                  var y = cell[i].y;
                  g_pointTree.ra(x - 5, y - 5, 10, 10, function(point) {
                    if (point.V != thisCell && 25 > (x - point.x) * (x - point.x) + (y - point.y) * (y - point.y)) {
                      reduce = true;
                    }
                  });
                  if (!reduce && (cell[i].x < g_minX || cell[i].y < g_minY || cell[i].x > g_maxX || cell[i].y > g_maxY)) {
                    reduce = true;
                  }
                  if (reduce) {
                    if (0 < cell[i].b) {
                      cell[i].b = 0;
                    }
                    cell[i].b -= 1;
                  }
                }
                size += cell[i].b;
                if (0 > size) {
                  size = 0;
                }
                size = this.n ? (19 * size + this.size) / 20 : (12 * size + this.size) / 13;
                cell[i].i = (prevAcc + nextAcc + 8 * size) / 10;
                prevAcc = 2 * Math.PI / num;
                nextAcc = this.a[i].i;
                if (this.h && 0 == i % 2) {
                  nextAcc += 5;
                }
                cell[i].x = this.x + Math.cos(prevAcc * i + roll) * nextAcc;
                cell[i].y = this.y + Math.sin(prevAcc * i + roll) * nextAcc;
              }
            },
            P: function() {
              if (0 >= this.id) {
                return 1;
              }
              var posRatio;
              posRatio = (g_time - this.Q) / 120;
              posRatio = 0 > posRatio ? 0 : 1 < posRatio ? 1 : posRatio;
              var sizeRatio = 0 > posRatio ? 0 : 1 < posRatio ? 1 : posRatio;
              this.l();
              if (this.G && 1 <= sizeRatio) {
                var i = g_destroyedCells.indexOf(this);
                if (-1 != i) {
                  g_destroyedCells.splice(i, 1);
                }
              }
              this.x = posRatio * (this.J - this.s) + this.s;
              this.y = posRatio * (this.K - this.t) + this.t;
              this.size = sizeRatio * (this.q - this.r) + this.r;
              return sizeRatio;
            },
            N: function() {
              return 0 >= this.id ? true : this.x + this.size + 40 < g_viewX - g_protocol / 2 / g_scale || this.y + this.size + 40 < g_viewY - __unmatched_61 / 2 / g_scale || this.x - this.size - 40 > g_viewX + g_protocol / 2 / g_scale || this.y - this.size - 40 > g_viewY + __unmatched_61 / 2 / g_scale ? false : true;
            },
            w: function(context) {
              if (this.N()) {
                ++this.Y;
                var isSimpleDrawing = 0 < this.id && !this.h && !this.n && 0.4 > g_scale;
                if (5 > this.I() && 0 < this.id) {
                  isSimpleDrawing = true;
                }
                if (this.R && !isSimpleDrawing) {
                  for (var text = 0; text < this.a.length; text++) {
                    this.a[text].i = this.size;
                  }
                }
                this.R = isSimpleDrawing;
                context.save();
                this.ja = g_time;
                text = this.P();
                if (this.G) {
                  context.globalAlpha *= 1 - text;
                }
                context.lineWidth = 10;
                context.lineCap = 'round';
                context.lineJoin = this.h ? 'miter' : 'round';
                if (g_noColors) {
                  context.fillStyle = '#FFFFFF';
                  context.strokeStyle = '#AAAAAA';
                } else {
                  context.fillStyle = this.color;
                  context.strokeStyle = this.color;
                }
                if (isSimpleDrawing) {
                  context.beginPath();
                  context.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                } else {
                  this.qa();
                  context.beginPath();
                  var num = this.I();
                  context.moveTo(this.a[0].x, this.a[0].y);
                  for (text = 1; text <= num; ++text) {
                    var skin = text % num;
                    context.lineTo(this.a[skin].x, this.a[skin].y);
                  }
                }
                context.closePath();
                text = this.name.toLowerCase();
                if (!this.n && g_showSkins && ':teams' != __unmatched_96) {
                  num = this.fa;
                  if (null == num) {
                    num = null;
                  } else if (':' == num[0]) {
                    if (!__unmatched_135.hasOwnProperty(num)) {
                      __unmatched_135[num] = new Image();
                      __unmatched_135[num].src = num.slice(1);
                    }
                    num = 0 != __unmatched_135[num].width && __unmatched_135[num].complete ? __unmatched_135[num] : null;
                  } else {
                    num = null;
                  }
                  if (!num) {
                    if (-1 != g_skinNamesA.indexOf(text)) {
                      if (!g_skinCache.hasOwnProperty(text)) {
                        g_skinCache[text] = new Image();
                        g_skinCache[text].src = 'skins/' + text + '.png';
                      }
                      num = 0 != g_skinCache[text].width && g_skinCache[text].complete ? g_skinCache[text] : null;
                    } else {
                      num = null;
                    }
                  }
                } else {
                  num = null;
                }
                skin = num;
                if (!isSimpleDrawing) {
                  context.stroke();
                }
                context.fill();
                if (null != skin) {
                  context.save();
                  context.clip();
                  context.drawImage(skin, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size);
                  context.restore();
                }
                if ((g_noColors || 15 < this.size) && !isSimpleDrawing) {
                  context.strokeStyle = '#000000';
                  context.globalAlpha *= 0.1;
                  context.stroke();
                }
                context.globalAlpha = 1;
                num = -1 != g_playerCells.indexOf(this);
                isSimpleDrawing = ~~this.y;
                if (0 != this.id && (g_showNames || num) && this.name && this.o && (null == skin || -1 == __unmatched_134.indexOf(text))) {
                  skin = this.o;
                  skin.C(this.name);
                  skin.M(this.l());
                  text = 0 >= this.id ? 1 : Math.ceil(10 * g_scale) / 10;
                  skin.ea(text);
                  var skin = skin.L();
                  var g_width = ~~(skin.width / text);
                  var g_height = ~~(skin.height / text);
                  context.drawImage(skin, ~~this.x - ~~(g_width / 2), isSimpleDrawing - ~~(g_height / 2), g_width, g_height);
                  isSimpleDrawing += skin.height / 2 / text + 4;
                }
                if (0 < this.id && g_darkTheme && (num || 0 == g_playerCells.length && (!this.h || this.n) && 20 < this.size)) {
                  if (null == this.O) {
                    this.O = new CachedCanvas(this.l() / 2, '#FFFFFF', true, '#000000');
                  }
                  num = this.O;
                  num.M(this.l() / 2);
                  num.C(~~(this.size * this.size / 100));
                  text = Math.ceil(10 * g_scale) / 10;
                  num.ea(text);
                  skin = num.L();
                  g_width = ~~(skin.width / text);
                  g_height = ~~(skin.height / text);
                  context.drawImage(skin, ~~this.x - ~~(g_width / 2), isSimpleDrawing - ~~(g_height / 2), g_width, g_height);
                }
                context.restore();
              }
            }
          };
          CachedCanvas.prototype = {
            F: '',
            S: '#000000',
            U: false,
            v: '#000000',
            u: 16,
            p: null,
            T: null,
            k: false,
            D: 1,
            M: function(val) {
              if (this.u != val) {
                this.u = val;
                this.k = true;
              }
            },
            ea: function(val) {
              if (this.D != val) {
                this.D = val;
                this.k = true;
              }
            },
            setStrokeColor: function(val) {
              if (this.v != val) {
                this.v = val;
                this.k = true;
              }
            },
            C: function(val) {
              if (val != this.F) {
                this.F = val;
                this.k = true;
              }
            },
            L: function() {
              if (null == this.p) {
                this.p = document.createElement('canvas');
                this.T = this.p.getContext('2d');
              }
              if (this.k) {
                this.k = false;
                var canvas = this.p;
                var context = this.T;
                var value = this.F;
                var scale = this.D;
                var size = this.u;
                var font = size + 'px Ubuntu';
                context.font = font;
                var extra = ~~(0.2 * size);
                canvas.width = (context.measureText(value).width + 6) * scale;
                canvas.height = (size + extra) * scale;
                context.font = font;
                context.scale(scale, scale);
                context.globalAlpha = 1;
                context.lineWidth = 3;
                context.strokeStyle = this.v;
                context.fillStyle = this.S;
                if (this.U) {
                  context.strokeText(value, 3, size - extra / 2);
                }
                context.fillText(value, 3, size - extra / 2);
              }
              return this.p;
            }
          };
          if (!Date.now) {
            Date.now = function() {
              return new Date().getTime();
            };
          }
          (function() {
            for (var g_skinNamesB = [
                  'ms',
                  'moz',
                  'webkit',
                  'o'
                ], i = 0; i < g_skinNamesB.length && !window.requestAnimationFrame; ++i) {
              window.requestAnimationFrame = window[g_skinNamesB[i] + 'RequestAnimationFrame'];
              window.cancelAnimationFrame = window[g_skinNamesB[i] + 'CancelAnimationFrame'] || window[g_skinNamesB[i] + 'CancelRequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame) {
              window.requestAnimationFrame = function(__unmatched_365) {
                return setTimeout(__unmatched_365, 1000 / 60);
              };
              window.cancelAnimationFrame = function(__unmatched_366) {
                clearTimeout(__unmatched_366);
              };
            }
          }());
          var QTreeFactory = {
            la: function(params) {
              function Node(left, top, width, height, depth) {
                this.x = left;
                this.y = top;
                this.j = width;
                this.g = height;
                this.depth = depth;
                this.items = [];
                this.c = [];
              }
              var maxItems = params.ma || 2;
              var maxDepth = params.na || 4;
              Node.prototype = {
                x: 0,
                y: 0,
                j: 0,
                g: 0,
                depth: 0,
                items: null,
                c: null,
                H: function(rect) {
                  for (var i = 0; i < this.items.length; ++i) {
                    var item = this.items[i];
                    if (item.x >= rect.x && item.y >= rect.y && item.x < rect.x + rect.j && item.y < rect.y + rect.g) {
                      return true;
                    }
                  }
                  if (0 != this.c.length) {
                    var thisNode = this;
                    return this.$(rect, function(n) {
                      return thisNode.c[n].H(rect);
                    });
                  }
                  return false;
                },
                A: function(rect, callback) {
                  for (var i = 0; i < this.items.length; ++i) {
                    callback(this.items[i]);
                  }
                  if (0 != this.c.length) {
                    var node = this;
                    this.$(rect, function(n) {
                      node.c[n].A(rect, callback);
                    });
                  }
                },
                m: function(item) {
                  if (0 != this.c.length) {
                    this.c[this.Z(item)].m(item);
                  } else if (this.items.length >= maxItems && this.depth < maxDepth) {
                    this.ia();
                    this.c[this.Z(item)].m(item);
                  } else {
                    this.items.push(item);
                  }
                },
                Z: function(item) {
                  return item.x < this.x + this.j / 2 ? item.y < this.y + this.g / 2 ? 0 : 2 : item.y < this.y + this.g / 2 ? 1 : 3;
                },
                $: function(rect, callback) {
                  return rect.x < this.x + this.j / 2 && (rect.y < this.y + this.g / 2 && callback(0) || rect.y >= this.y + this.g / 2 && callback(2)) || rect.x >= this.x + this.j / 2 && (rect.y < this.y + this.g / 2 && callback(1) || rect.y >= this.y + this.g / 2 && callback(3)) ? true : false;
                },
                ia: function() {
                  var depth = this.depth + 1;
                  var width = this.j / 2;
                  var height = this.g / 2;
                  this.c.push(new Node(this.x, this.y, width, height, depth));
                  this.c.push(new Node(this.x + width, this.y, width, height, depth));
                  this.c.push(new Node(this.x, this.y + height, width, height, depth));
                  this.c.push(new Node(this.x + width, this.y + height, width, height, depth));
                  depth = this.items;
                  this.items = [];
                  for (width = 0; width < depth.length; width++) {
                    this.m(depth[width]);
                  }
                },
                clear: function() {
                  for (var i = 0; i < this.c.length; i++) {
                    this.c[i].clear();
                  }
                  this.items.length = 0;
                  this.c.length = 0;
                }
              };
              var __unmatched_371 = {
                x: 0,
                y: 0,
                j: 0,
                g: 0
              };
              return {
                root: new Node(params.ca, params.da, params.oa - params.ca, params.pa - params.da, 0),
                m: function(item) {
                  this.root.m(item);
                },
                A: function(rect, callback) {
                  this.root.A(rect, callback);
                },
                ra: function(left, top, width, height, callback) {
                  __unmatched_371.x = left;
                  __unmatched_371.y = top;
                  __unmatched_371.j = width;
                  __unmatched_371.g = height;
                  this.root.A(__unmatched_371, callback);
                },
                H: function(rect) {
                  return this.root.H(rect);
                },
                clear: function() {
                  this.root.clear();
                }
              };
            }
          };
          var __unmatched_137 = function() {
            var __unmatched_404 = new Cell(0, 0, 0, 32, '#ED1C24', '');
            var __unmatched_405 = document.createElement('canvas');
            __unmatched_405.width = 32;
            __unmatched_405.height = 32;
            var rect = __unmatched_405.getContext('2d');
            return function() {
              if (0 < g_playerCells.length) {
                __unmatched_404.color = g_playerCells[0].color;
                __unmatched_404.B(g_playerCells[0].name);
              }
              rect.clearRect(0, 0, 32, 32);
              rect.save();
              rect.translate(16, 16);
              rect.scale(0.4, 0.4);
              __unmatched_404.w(rect);
              rect.restore();
              var __unmatched_407 = document.getElementById('favicon');
              var canvas = __unmatched_407.cloneNode(true);
              canvas.setAttribute('href', __unmatched_405.toDataURL('image/png'));
              __unmatched_407.parentNode.replaceChild(canvas, __unmatched_407);
            };
          }();
          $(function() {
            __unmatched_137();
          });
          $(function() {
            if (+window.localStorage.wannaLogin) {
              if (window.localStorage.loginCache) {
                __unmatched_45(window.localStorage.loginCache);
              }
              if (window.localStorage.fbPictureCache) {
                $('.agario-profile-picture').attr('src', window.localStorage.fbPictureCache);
              }
            }
          });
          window.facebookLogin = function() {
            window.localStorage.wannaLogin = 1;
          };
          window.fbAsyncInit = function() {
            function __unmatched_409() {
              window.localStorage.wannaLogin = 1;
              if (null == window.FB) {
                alert('You seem to have something blocking Facebook on your browser, please check for any extensions');
              } else {
                window.FB.login(function(__unmatched_410) {
                  UpdateScale(__unmatched_410);
                }, {
                  scope: 'public_profile, email'
                });
              }
            }
            window.FB.init({
              appId: '677505792353827',
              cookie: true,
              xfbml: true,
              status: true,
              version: 'v2.2'
            });
            window.FB.Event.subscribe('auth.statusChange', function(__unmatched_411) {
              if (+window.localStorage.wannaLogin) {
                if ('connected' == __unmatched_411.status) {
                  UpdateScale(__unmatched_411);
                } else {
                  __unmatched_409();
                }
              }
            });
            window.facebookLogin = __unmatched_409;
          };
          window.logout = function() {
            __unmatched_109 = null;
            $('#helloContainer').attr('data-logged-in', '0');
            $('#helloContainer').attr('data-has-account-data', '0');
            delete window.localStorage.wannaLogin;
            delete window.localStorage.loginCache;
            delete window.localStorage.fbPictureCache;
            Start();
          };
          var __unmatched_138 = function() {
            function ParseString(__unmatched_421, __unmatched_422, __unmatched_423, __unmatched_424, __unmatched_425) {
              var canvas = __unmatched_422.getContext('2d');
              var width = __unmatched_422.width;
              __unmatched_422 = __unmatched_422.height;
              __unmatched_421.color = __unmatched_425;
              __unmatched_421.B(__unmatched_423);
              __unmatched_421.size = __unmatched_424;
              canvas.save();
              canvas.translate(width / 2, __unmatched_422 / 2);
              __unmatched_421.w(canvas);
              canvas.restore();
            }
            for (var __unmatched_413 = new Cell(-1, 0, 0, 32, '#5bc0de', ''), __unmatched_414 = new Cell(-1, 0, 0, 32, '#5bc0de', ''), __unmatched_415 = '#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e'.split(' '), g_skinNamesC = [], j = 0; j < __unmatched_415.length; ++j) {
              var sub = j / __unmatched_415.length * 12;
              var __unmatched_419 = 30 * Math.sqrt(j / __unmatched_415.length);
              g_skinNamesC.push(new Cell(-1, Math.cos(sub) * __unmatched_419, Math.sin(sub) * __unmatched_419, 10, __unmatched_415[j], ''));
            }
            __unmatched_43(g_skinNamesC);
            var data = document.createElement('canvas');
            data.getContext('2d');
            data.width = data.height = 70;
            ParseString(__unmatched_414, data, '', 26, '#ebc0de');
            return function() {
              $('.cell-spinner').filter(':visible').each(function() {
                var __unmatched_428 = $(this);
                var g = Date.now();
                var __unmatched_430 = this.width;
                var __unmatched_431 = this.height;
                var __unmatched_432 = this.getContext('2d');
                __unmatched_432.clearRect(0, 0, __unmatched_430, __unmatched_431);
                __unmatched_432.save();
                __unmatched_432.translate(__unmatched_430 / 2, __unmatched_431 / 2);
                for (var g_numFrames = 0; 10 > g_numFrames; ++g_numFrames) {
                  __unmatched_432.drawImage(data, (0.1 * g + 80 * g_numFrames) % (__unmatched_430 + 140) - __unmatched_430 / 2 - 70 - 35, __unmatched_431 / 2 * Math.sin((0.001 * g + g_numFrames) % Math.PI * 2) - 35, 70, 70);
                }
                __unmatched_432.restore();
                if (__unmatched_428 = __unmatched_428.attr('data-itr')) {
                  __unmatched_428 = __unmatched_15(__unmatched_428);
                }
                ParseString(__unmatched_413, this, __unmatched_428 || '', +$(this).attr('data-size'), '#5bc0de');
              });
              $('#statsPellets').filter(':visible').each(function() {
                $(this);
                var __unmatched_434 = this.width;
                var __unmatched_435 = this.height;
                this.getContext('2d').clearRect(0, 0, __unmatched_434, __unmatched_435);
                for (__unmatched_434 = 0; __unmatched_434 < g_skinNamesC.length; __unmatched_434++) {
                  ParseString(g_skinNamesC[__unmatched_434], this, '', g_skinNamesC[__unmatched_434].size, g_skinNamesC[__unmatched_434].color);
                }
              });
            };
          }();
          var cached = [];
          var __unmatched_140 = 0;
          var __unmatched_141 = '#000000';
          var __unmatched_142 = false;
          var __unmatched_143 = false;
          var __unmatched_144 = 0;
          var __unmatched_145 = 0;
          var __unmatched_146 = 0;
          var __unmatched_147 = 0;
          var g_mode = 0;
          var __unmatched_149 = true;
          setInterval(function() {
            if (__unmatched_143) {
              cached.push(__unmatched_37() / 100);
            }
          }, 1000 / 60);
          setInterval(function() {
            var start = __unmatched_52();
            if (0 != start) {
              ++__unmatched_146;
              if (0 == g_mode) {
                g_mode = start;
              }
              g_mode = Math.min(g_mode, start);
            }
          }, 1000);
          window.closeStats = function() {
            __unmatched_142 = false;
            $('#stats').hide();
            __unmatched_14(window.ab);
            __unmatched_10(0);
          };
          window.setSkipStats = function(__unmatched_438) {
            __unmatched_149 = !__unmatched_438;
          };
          $(function() {
            $(Init);
          });
        }
      }
    }
  }(window, window.jQuery));

};
