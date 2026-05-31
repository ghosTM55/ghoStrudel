// New York —— underground boom bap / jazz noir
// 深夜地铁 + 天台 cypher：保留 boom bap 骨架，加入 noir 和声、subway brake 高音、切碎的 rim/hat 质感。
setcps(88 / 60 / 4)

// ii - V - I 里塞入 altered dominant，纽约爵士味更浓
let chords = chord("<D-9 G13 C^9 A7b9>/1")
  .dict("ireal")
  .voicing()
  .color("#FCD34D")

// 尘土电钢：更稀疏，留出鼓和 bass 的脏空间
let keys = chords
  .s("gm_epiano1")
  .struct("x ~ ~ [~ x] ~ x ~ ~")
  .gain(.21)
  .room(.38)
  .delay(.18)
  .crush(7)
  .coarse(2)
  .release(.58)
  .lpf(sine.range(1400, 2900).slow(8))
  .color("#FCD34D")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// 暗色 Rhodes 回声：像远处楼顶反射的和弦
let stab = chords
  .arp("0 [2 4] ~ 3")
  .s("gm_epiano1")
  .gain(.095)
  .room(.62)
  .delay(.34)
  .crush(8)
  .lpf(2200)
  .pan(sine.range(.35, .65).slow(4))
  .color("#C4B5FD")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// 慵懒贝斯：根音 + 经过音 + 偶发上行，增强“人手弹”的拖拽感
let bass = n("0 ~ ~ 0 ~ <5 4> ~ [~ 7]")
  .scale("C2:dorian")
  .s("sawtooth")
  .legato(.72)
  .lpf(sine.range(420, 850).slow(4))
  .lpq(4)
  .gain(.44)
  .swingBy(1 / 3, 2)
  .color("#FDBA74")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// subway brake：高处的短促摩擦音，用三角波做城市噪声的音乐化替代
let brake = n("~ ~ 11 ~ ~ 10 ~ 8")
  .scale("C5:dorian")
  .s("triangle")
  .gain(.055)
  .attack(.02)
  .release(.18)
  .delay(.24)
  .room(.55)
  .crush(6)
  .color("#93C5FD")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// 句尾 sax-like lead：不铺满，只做 cypher 回答
let lead = note("e5 ~ g5 a5 ~ c6 ~ ~ b5 ~ g5 ~ ~ a5 ~ e5")
  .s("gm_lead_6_voice")
  .vowel("<o a>")
  .gain(.095)
  .attack(.05)
  .release(.48)
  .room(.58)
  .delay(.28)
  .crush(8)
  .lpf(2600)
  .color("#F9A8D4")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// boom bap 鼓：snare 稳，kick 更会讲话；rim/hat 负责地铁轨道感
let kick = s("bd ~ ~ bd ~ [~ bd] bd ~").bank("RolandTR909").gain(.92).shape(.28).lpf(1050).color("#9AFEFF")
let snare = s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR909").gain(.52).room(.32).delay(.06).hpf(700).color("#A7F3D0")
let hats = s("hh*8")
  .bank("RolandTR909")
  .gain(".17 .06 .12 .05")
  .hpf(6500)
  .swingBy(1 / 3, 4)
  .coarse(2)
  .pan(sine.range(.42, .58).slow(2))
  .color("#BAE6FD")
let rim = s("~ rim [~ rim] ~ rim ~ [rim ~] ~").bank("RolandTR909").gain(.15).hpf(1800).delay(.12).pan(rand).color("#C4B5FD")
let dust = s("~ hh ~ ~ ~ hh ~ [~ hh]").bank("RolandTR909").gain(.045).hpf(9000).crush(5).color("#E5E7EB")

let drums = stack(kick, snare, hats, rim, dust)
  ._punchcard({ cycles: 4, labels: 0 })

let intro = stack(keys, stab, bass.gain(.22), brake)
let groove = stack(drums, bass, keys, stab)
let full = stack(drums, bass, keys, stab, lead, brake)
let breakdown = stack(keys.gain(.15), bass.gain(.26), rim, brake.delay(.4))
let outro = stack(keys.gain(.15), stab.gain(.08), bass.gain(.18))

arrange(
  [8, intro],
  [16, groove],
  [16, full],
  [8, breakdown],
  [16, full],
  [8, outro]
)
  .late("[0 .008]*2")
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
