// =============================================================================
// Strudel 完整特性展示曲 —— Browser REPL 版本（不考虑 VS Code 插件兼容）
// -----------------------------------------------------------------------------
// 使用方式：
//   1. 运行 `bash scripts/serve.sh`
//   2. 打开 http://localhost:8092/
//   3. 在网页里的 Strudel editor 中按 Cmd/Ctrl + Enter，或点击 Evaluate / Play
//
// 这不是“最佳音乐作品”，而是一份能播放、可拆改的 Strudel 速查表。
// 每个 layer 都展示一类语法：mini-notation、音高/和声、采样/GM/合成音色、
// 效果器、调制信号、pattern 变换、编排、以及视觉反馈。
//
// 视觉说明：
//   - .color()       给事件指定颜色，供 punchcard / pianoroll 等可视化读取。
//   - .punchcard()   适合鼓组和整体节奏结构；当前默认启用为背景视觉。
//   - .pianoroll()   适合看旋律/低音/和弦的音高运动。
//   - .scope()       适合看波形/音频能量。
//   - 下划线版本如 ._punchcard() / ._pianoroll() / ._scope() 会生成 inline 图形，
//     更适合给单个 layer 做局部观察。
//
// 注意：这里使用网页 REPL 支持的完整写法，比如 .piano() 和视觉函数。
// VS Code Strudel 插件可能不支持这些方法；本文件现在以网页端效果优先。
// =============================================================================

// ===== 全局速度 ===============================================================
// 120 BPM；Strudel 的 setcps 是 cycles per second。
// 如果一个 cycle 理解成 4 拍，公式就是 BPM / 60 / 4。
setcps(120 / 60 / 4)

// ===== 和声骨架：chord + iReal 字典 + voicing ================================
// <...>/2：尖括号里的和弦每 2 个 cycle 轮换一次。
// ^7 是 iReal 字典里的 major seventh 写法，比 maj7 更稳。
let chords = chord("<Am7 F^7 C^7 G6>/2")
  .dict("ireal")
  .voicing()
  .color("#FDE68A")

// ===== 钢琴琶音：arp + .piano() + inline pianoroll ===========================
// arp("0 1 2 3") 按和弦音索引弹出琶音。
// .piano() 是网页 REPL 里的便捷钢琴音色写法；这里不再兼容插件，所以直接使用。
// ._pianoroll() 是 inline 音高图，可在代码附近显示这一层的音高运动。
let pianoArp = chords
  .arp("0 1 2 [3 2] 1 2")
  .piano()
  .gain(.42)
  .room(.55)
  .delay(.18)
  .release(.55)
  ._pianoroll({ cycles: 8, fold: 0 })
  .color("#FDE68A")

// ===== 和弦铺底：GM 音色 + 滤波调制 ==========================================
// gm_epiano1 是 General MIDI 电钢琴；lpf 使用 sine 信号慢慢扫动截止频率。
let epianoPad = chords
  .s("gm_epiano1")
  .gain(.16)
  .room(.8)
  .delay(.28)
  .attack(.04)
  .release(1.2)
  .lpf(sine.range(700, 3200).slow(12))
  .color("#60A5FA")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// ===== 弦乐层：attack / release / perlin =====================================
// perlin 是平滑随机信号，比 rand 更适合慢速音色变化。
let strings = chords
  .s("gm_string_ensemble_1")
  .gain(.13)
  .attack(.12)
  .release(1.4)
  .room(.75)
  .lpf(perlin.range(1200, 4200).slow(8))
  .color("#F0ABFC")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// ===== 合成 Stab：n + scale + distort + crush + jux(rev) =====================
// n() 生成音阶级数，scale() 把级数映射到 A 小调。
// jux(rev) 把一个声道保持原样、另一个声道反向，制造立体声差异。
let acidStab = n("0 ~ <2 4> ~ 5 ~ 3 ~")
  .scale("A3:minor")
  .s("sawtooth")
  .distort(1.25)
  .crush(6)
  .lpf(1800)
  .release(.18)
  .gain(.24)
  .jux(rev)
  .color("#F472B6")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// ===== 鼓组：mini-notation / bank / 欧几里得 / 复节拍 =========================
// *4：一个 cycle 里重复 4 次。~：休止。
let kick = s("bd*4")
  .bank("RolandTR909")
  .gain(.92)
  .shape(.32)
  .lpf(1200)
  .color("#9AFEFF")

// cp：clap；backbeat 在第 2、4 拍。
let clap = s("~ cp ~ cp")
  .bank("RolandTR909")
  .gain(.42)
  .room(.38)
  .delay(.08)
  .hpf(1200)
  .color("#A7F3D0")

// sd：snare；和 clap 叠加，增强中频冲击。
let snare = s("~ sd ~ [sd ~]")
  .bank("RolandTR909")
  .gain(.24)
  .room(.5)
  .hpf(700)
  .color("#BBF7D0")

// hh*8：八分闭镲；saw.range 调制音量，sine.range 调制声像。
let hats = s("hh*8")
  .bank("RolandTR909")
  .gain(saw.range(.06, .26))
  .hpf(6500)
  .pan(sine.range(.32, .68).slow(4))
  .swingBy(1 / 3, 4)
  .color("#BAE6FD")

// rim(3,8)：欧几里得节奏，把 3 个击打平均分布到 8 格。
let rim = s("rim(3,8)")
  .bank("RolandTR909")
  .gain(.2)
  .delay(.12)
  .pan(rand)
  .color("#C4B5FD")

// {~ oh}%4：复节拍/重新分组；mask 用 0/1 模板筛掉部分事件。
let openHat = s("{~ oh}%4")
  .bank("RolandTR909")
  .gain(.16)
  .hpf(5200)
  .mask("1 0 1 1")
  .room(.26)
  .color("#7DD3FC")

// 给鼓组一个 inline punchcard，适合观察节奏事件分布。
let drums = stack(kick, clap, snare, hats, rim, openHat)
  ._punchcard({ cycles: 4, fold: 1, labels: 0 })

// ===== 低音：scale + off + add(note()) + 共振滤波 =============================
// off(.25, ...) 复制一份延后 1/4 cycle 的影子；add(note(12)) 升高一个八度。
let bass = n("0 ~ <3 5> ~ 0 [~ 0] 4 ~")
  .scale("A1:minor")
  .s("sawtooth")
  .off(.25, add(note(12)))
  .legato(.68)
  .lpf(sine.range(180, 1300).slow(4))
  .lpq(8)
  .gain(.45)
  .color("#38BDF8")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// ===== Lead：run + segment + vowel + ply =====================================
// run(8) 生成 0..7 的级数序列；segment(8) 把连续/生成信号切成每 cycle 8 段。
// vowel 是元音共振峰滤波，常用于拟人声/酸性 lead。
let lead = n(run(8).segment(8))
  .scale("A4:minor")
  .s("gm_lead_6_voice")
  .vowel("<a e i o>")
  .ply("<1 1 2 1>")
  .delay(.2)
  .room(.35)
  .gain(.12)
  .color("#C084FC")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// ===== Glitch / Texture：采样编号、速度、coarse、stut、sometimesBy =============
// bd:1 / hh:2 这类写法选择同类采样里的不同编号。
// speed 改变采样播放速度；coarse 做粗粒度降采样；stut 做短促重复。
let glitch = s("[bd:1 ~] [hh:2 hh:3] ~ [cp:2 ~]")
  .bank("RolandTR909")
  .gain(.14)
  .speed("<1 .5 1.5 1>")
  .coarse("<2 4 8 2>")
  .stut(3, .08, .65)
  .sometimesBy(.35, x => x.rev())
  .pan(rand)
  .color("#FB7185")

// ===== 附加特性 A：时间变换 + triangle 波形（iter / slow / fast / rot）========
// triangle 波形比 sawtooth 柔；iter(4) 每个 cycle 把序列旋转一位，4 个 cycle 一轮。
// 想换写法：.slow(2) 放慢、.fast(2) 加速、.rot("<0 1 2 3>") 只旋转音高不动节奏。
let motif = n("0 2 4 5 7 5 4 2")
  .scale("A4:minor")
  .s("triangle")
  .release(.16)
  .room(.3)
  .gain(.12)
  .color("#A78BFA")

// ===== 附加特性 B：采样切片 chop / striate ===================================
// chop(n)：把一个采样切成 n 段，按事件依次播放（保持顺序）。
// striate(n)：同样切 n 段，但跨多个事件交错扫过，granular 质感。
let chopped = s("bd").chop(8)
  .bank("RolandTR909")
  .speed("<1 1.5>")
  .gain(.2)
  .color("#FCD34D")

let striated = s("hh*2").striate(8)
  .bank("RolandTR909")
  .hpf(3000)
  .gain(.1)
  .color("#FDE68A")

// ===== 附加特性 C：FM 合成 + square 方波 =====================================
// fm(index) 调制指数、fmh 调制器/载波频率比，叠在 square 上做带金属感的低音。
let fmBass = n("0 ~ 0 [~ 3] 0 ~ 5 ~")
  .scale("A1:minor")
  .s("square")
  .fm("<2 4 6>")
  .fmh(2)
  .lpf(sine.range(300, 1400).slow(3))
  .release(.2)
  .gain(.32)
  .color("#34D399")

// ===== 附加特性 D：概率别名 sometimes / often / someCyclesBy ==================
// sometimes≈sometimesBy(.5)、often≈.75、rarely≈.25；someCyclesBy 以 cycle 为单位整组施加。
let proba = s("hh*8")
  .bank("RolandTR909")
  .gain(.12)
  .hpf(7000)
  .sometimes(x => x.speed(2))
  .someCyclesBy(.4, x => x.rev())
  .pan(rand)
  .color("#22D3EE")

// ===== 附加特性 E：chooseCycles 随机选择 + press 切分 + add 移调 ==============
// chooseCycles 每个 cycle 随机选一个采样；press 把事件推到格子后半做切分/反拍；
// add("<0 7 -5 2>") 给音级整体移调（小调里 +7 约等于上行五度）。
let pick = s(chooseCycles("rim", "cp", "hh"))
  .bank("RolandTR909")
  .struct("x ~ x ~ x ~ x x")
  .gain(.16)
  .delay(.12)
  .pan(rand)
  .color("#F472B6")

let stab2 = n("0 3 5 7")
  .scale("A3:minor")
  .add("<0 7 -5 2>")
  .s("sawtooth")
  .press()
  .lpf(2200)
  .release(.14)
  .gain(.16)
  .color("#FB923C")

// 把附加特性合成一段，编排里作为独立展示段播放。
let extras = stack(
  motif.iter(4),
  chopped,
  striated,
  fmBass,
  proba,
  pick,
  stab2
)

// ===== 章节编排：stack / every / chunk / struct / palindrome / degradeBy ======
let intro = stack(
  epianoPad,
  pianoArp
)

let groove = stack(
  drums,
  bass,
  epianoPad,
  pianoArp
)

let build = stack(
  drums,
  bass,
  epianoPad,
  acidStab.every(4, x => x.fast(2)),
  pianoArp.chunk(4, x => x.add(note(12))),
  glitch.degradeBy(.25)
)

let breakdown = stack(
  // struct 用节奏模板重新触发 bass 的音高。
  bass.struct("x ~ x x ~ x ~ x").gain(.7),
  // palindrome 每隔一个 cycle 正反交替。
  pianoArp.palindrome(),
  // degradeBy 随机丢弃事件，制造空隙。
  lead.degradeBy(.42),
  strings,
  epianoPad
)

let climax = stack(
  kick.ply(2).gain(.8),
  clap,
  snare,
  hats.hurry(2),
  rim.echo(3, .125, .5),
  openHat,
  bass.superimpose(x => x.add(note(7)).gain(.22)),
  acidStab,
  lead,
  glitch,
  pianoArp.ribbon(2, 2),
  strings.gain(.28)
)

// cat：依次播放多个 pattern；这里做逐步抽离的 outro。
let outro = cat(
  stack(epianoPad, pianoArp, kick),
  stack(epianoPad, pianoArp),
  stack(epianoPad),
  silence
)

// ===== 主编排：arrange ========================================================
// 每个 [数字, pattern] 表示该 pattern 持续多少 cycle。
arrange(
  [8, intro],
  [16, groove],
  [16, build],
  [8, breakdown],
  [16, climax],
  [16, extras],
  [8, outro]
)
  // late 做极小人性化偏移，避免所有事件完全贴格。
  .late("[0 .004]*4")
  // 主背景视觉：用 pianoroll + fold:1 做 punchcard-style 背景；
  // 这样 playhead: .40 会和 CSS 的 DAW-style 播放线保持一致。
  .pianoroll({
    cycles: 16,
    playhead: .40,
    fold: 1,
    smear: 0,
    labels: 0,
    active: "#00F5FF70",
    inactive: "#062A3A30",
    playheadColor: "#00000000"
  })

// ===== 可视化替换练习 =========================================================
// 想试不同视觉时，只改上面最后的 .punchcard(...)：
//
// 1) 看音高运动：
// .pianoroll({ cycles: 16, playhead: .40, labels: 0 })
//
// 2) 看波形/能量：
// .scope({ cycles: 8 })
//
// 3) 看 pitch wheel / 螺旋类视觉：如果当前 Strudel 版本支持，可试：
// .pitchwheel({ cycles: 8 })
//
// 4) 单层 inline 视觉：已在 pianoArp 上用了 ._pianoroll()，在 drums 上用了 ._punchcard()。
//    你也可以给 lead 加：
// lead._scope()
// =============================================================================
