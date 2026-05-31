// Dubai —— mirage desert house / Arabic club
// 黄昏沙丘 + 玻璃塔夜店：保留 Phrygian 中东色彩，加入 mirage arpeggio、双层手鼓和更戏剧化的 drop。
setcps(124 / 60 / 4)

// FM 低音：更 club，句尾用 6/7 级制造沙漠旋涡感
let bass = n("0 ~ 0 0 ~ 0 [~ 0] <6 7>")
  .scale("E1:phrygian")
  .s("square")
  .fm("<1 3 5>")
  .fmh(2)
  .legato(.46)
  .lpf(sine.range(280, 1350).slow(2))
  .lpq(6)
  .gain(.43)
  .color("#FBBF24")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// oud 感拨弦：上下行更像现场乐手的装饰句
let oud = n("0 1 3 4 ~ 3 1 0 ~ 4 5 4 3 1 ~ <0 7>")
  .scale("E4:phrygian")
  .s("gm_pizzicato_strings")
  .gain(.17)
  .room(.46)
  .delay(.2)
  .release(.28)
  .color("#FCD34D")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// mirage arpeggio：高频闪光，像热浪折射
let mirage = n("0 3 5 7 5 3 1 0")
  .scale("E5:phrygian")
  .s("triangle")
  .gain(.07)
  .attack(.01)
  .release(.18)
  .delay(.26)
  .room(.7)
  .pan(sine.range(.25, .75).slow(3))
  .color("#FDE68A")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// ney 主线：更像呼唤式旋律，留白后再回应
let ney = n("<0 3 4 5> ~ 7 ~ 5 4 ~ 3")
  .scale("E5:phrygian")
  .s("gm_lead_6_voice")
  .vowel("<a o>")
  .attack(.12)
  .release(1.1)
  .gain(.085)
  .room(.72)
  .delay(.32)
  .lpf(sine.range(1500, 3800).slow(6))
  .color("#93C5FD")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// 低频 drone：制造开场和 breakdown 的沙丘地平线
let drone = note("e2")
  .s("sawtooth")
  .legato(2.5)
  .lpf(sine.range(420, 760).slow(8))
  .gain(.13)
  .room(.68)
  .color("#A78BFA")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

// house 鼓 + 双层“手鼓”：一个稳，一个跑，制造 club 里的中东律动
let kick = s("bd*4").bank("RolandTR909").gain(.92).shape(.36).lpf(1300).color("#9AFEFF")
let clap = s("~ cp ~ cp").bank("RolandTR909").gain(.42).room(.32).hpf(1000).color("#A7F3D0")
let hats = s("hh*8")
  .bank("RolandTR909")
  .gain(saw.range(.055, .24))
  .hpf(7600)
  .pan(sine.range(.38, .62).slow(2))
  .color("#BAE6FD")
let ohat = s("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909").gain(.13).hpf(5200).color("#7DD3FC")
let darbuka = s("rim(5,8)").bank("RolandTR909").gain(.22).hpf(1500).delay(.09).pan(rand).color("#C4B5FD")
let tabla = s("~ rim [rim ~] rim ~ [~ rim] ~ rim").bank("RolandTR909").gain(.14).hpf(2100).delay(.16).pan(sine.range(.3, .7).slow(2)).color("#F9A8D4")

let drums = stack(kick, clap, hats, ohat, darbuka, tabla)
  ._punchcard({ cycles: 4, labels: 0 })

let intro = stack(drone, oud, mirage.gain(.045))
let groove = stack(drums, bass, oud, mirage)
let full = stack(drums, bass, oud, ney, mirage, drone)
let drop = stack(kick, bass, darbuka, tabla, mirage.gain(.1), ney.delay(.45))
let outro = stack(drone, oud.gain(.1), mirage.gain(.04))

// 真实播放编曲：保留鼓、尾音和 drop 的原始听感
let audio = arrange(
  [8, intro],
  [16, groove],
  [16, full],
  [8, drop],
  [16, full],
  [8, outro]
)

// 背景 pianoroll 的旋律参考层：只放有音高的声部，避免 mixed stack 漏画旋律事件
let visualGuide = arrange(
  [8, stack(drone, oud, mirage.gain(.045))],
  [16, stack(bass, oud, mirage)],
  [16, stack(bass, oud, ney, mirage, drone)],
  [8, stack(bass, mirage.gain(.1), ney.delay(.45))],
  [16, stack(bass, oud, ney, mirage, drone)],
  [8, stack(drone, oud.gain(.1), mirage.gain(.04))]
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
