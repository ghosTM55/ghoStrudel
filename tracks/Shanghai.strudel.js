// Shanghai —— maglev city pop / future funk
// 外滩霓虹 + 磁悬浮速度感：保留海派电钢核心，加入五声音阶铃声 hook、talkbox 影子旋律和更跳的 disco/funk 鼓。
setcps(116 / 60 / 4)

// IVmaj9 - V13 - iii7 - vi9；保留 city pop 甜感，但让和声更宽、更亮
let chords = chord("<F^9 G13 E-7 A-9>/2")
  .dict("ireal")
  .voicing()
  .color("#FCA5A5")

// 主电钢：切分更明显，像霓虹招牌闪烁
let ep = chords
  .s("gm_epiano1")
  .struct("x ~ [~ x] x [~ x] ~ x [~ x]")
  .gain(.22)
  .room(.48)
  .delay(.16)
  .release(.55)
  .lpf(sine.range(1500, 3600).slow(8))
  .color("#FCA5A5")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// 高八度玻璃感琶音：给城市夜景一点“水面反光”
let glass = chords
  .arp("0 2 4 6 5 3 1 2")
  .s("triangle")
  .gain(.075)
  .attack(.01)
  .release(.22)
  .delay(.28)
  .room(.65)
  .pan(sine.range(.25, .75).slow(3))
  .color("#FDBA74")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// funk 贝斯：更有弹跳，句尾上滑回应鼓组
let bass = n("0 ~ 0 [~ 3] 4 ~ [2 0] <~ 7>")
  .scale("C2:major")
  .s("sawtooth")
  .legato(.42)
  .lpf(sine.range(360, 1700).slow(2))
  .lpq(8)
  .gain(.43)
  .color("#86EFAC")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// 五声 hook：更短、更像可记住的城市 logo
let hook = n("0 2 4 5 ~ 4 2 ~ 1 2 4 7 ~ 5 4 2")
  .scale("C5:major")
  .s("triangle")
  .gain(.105)
  .attack(.015)
  .release(.28)
  .room(.55)
  .delay(.2)
  .color("#93C5FD")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// talkbox 影子旋律：只在 full 段出现，增加 future funk 人声味
let talk = n("~ 5 ~ 4 2 ~ 1 ~ ~ 2 4 ~ 5 ~ 7 ~")
  .scale("C4:major")
  .s("gm_lead_6_voice")
  .vowel("<a o e>")
  .gain(.075)
  .attack(.04)
  .release(.5)
  .room(.55)
  .delay(.32)
  .lpf(2400)
  .color("#C4B5FD")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// disco / funk 鼓：四四底盘 + ghost kick + rim 让 groove 更会走路
let kick = s("bd*4").bank("RolandTR909").gain(.9).shape(.34).lpf(1200).color("#9AFEFF")
let ghostKick = s("~ [~ bd] ~ ~ ~ bd ~ [~ bd]").bank("RolandTR909").gain(.24).shape(.2).lpf(1000).color("#67E8F9")
let snare = s("~ cp ~ cp").bank("RolandTR909").gain(.42).room(.32).hpf(900).color("#A7F3D0")
let hats = s("hh*8")
  .bank("RolandTR909")
  .gain(saw.range(.055, .22))
  .hpf(7200)
  .swingBy(1 / 3, 4)
  .pan(sine.range(.38, .62).slow(2))
  .color("#BAE6FD")
let rim = s("~ rim ~ [rim ~] ~ rim ~ [~ rim]").bank("RolandTR909").gain(.13).hpf(1800).delay(.08).pan(rand).color("#F9A8D4")
let ohat = s("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909").gain(.14).hpf(5200).color("#7DD3FC")

let drums = stack(kick, ghostKick, snare, hats, rim, ohat)
  ._punchcard({ cycles: 4, labels: 0 })

let intro = stack(ep, glass)
let groove = stack(drums, bass, ep, glass)
let full = stack(drums, bass, ep, glass, hook, talk)
let bridge = stack(ep.gain(.16), glass.gain(.11), hook.delay(.35), rim)
let outro = stack(ep, glass.gain(.05))

// 真实播放编曲：保留 disco/funk 鼓和原始段落听感
let audio = arrange(
  [8, intro],
  [16, groove],
  [16, full],
  [8, bridge],
  [16, full],
  [8, outro]
)

// 背景 pianoroll 的旋律参考层：只放有音高的声部，避免 mixed stack 漏画旋律事件
let visualGuide = arrange(
  [8, stack(ep, glass)],
  [16, stack(bass, ep, glass)],
  [16, stack(bass, ep, glass, hook, talk)],
  [8, stack(ep.gain(.16), glass.gain(.11), hook.delay(.35))],
  [16, stack(bass, ep, glass, hook, talk)],
  [8, stack(ep, glass.gain(.05))]
)

stack(
  audio,
  visualGuide.gain(0)
)
  .late("[0 .004]*4")
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
