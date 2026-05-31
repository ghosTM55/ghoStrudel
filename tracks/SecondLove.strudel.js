setcps(82 / 60 / 4)

let chords = chord("<C^7 G6 Am7 F^7>/2")
  .dict("ireal")
  .voicing()

let arpSoft = chords
  .arp("0 1 2 [3 2] 1 2")
  .s("piano")
  .gain(.36)
  .room(.72)
  .delay(.26)
  .release(.72)
  .color("#FDE68A")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let arpFlow = chords
  .arp("0 1 [2 3] 2 1 [2 3]")
  .fast(2)
  .s("piano")
  .gain(.32)
  .room(.62)
  .delay(.24)
  .release(.56)
  .color("#FDE68A")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let pianoChords = chords
  .s("piano")
  .gain(".2 .13 .17 .12")
  .room(.62)
  .delay(.18)
  .release(.62)
  .color("#FBBF24")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let melody = note("e5 [g5 a5] ~ g5 c6 [b5 g5] a5 ~")
  .s("piano")
  .gain(.4)
  .room(.68)
  .delay(.3)
  .release(.7)
  .color("#FCA5A5")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let tenderAnswer = note("~ c5 e5 [d5 c5] ~ g4 [a4 c5] ~")
  .s("piano")
  .gain(.22)
  .room(.74)
  .delay(.38)
  .release(.82)
  .pan(sine.range(.38, .62).slow(8))
  .color("#F9A8D4")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let breathVox = n("~ 2 ~ [3 4] ~ <5 4> [3 2] ~")
  .scale("C4:major")
  .s("gm_lead_6_voice")
  .vowel("<a o u e>")
  .attack(.18)
  .release(1.05)
  .legato(1.05)
  .room(.82)
  .delay(.34)
  .hpf(420)
  .lpf(sine.range(1800, 3400).slow(5))
  .gain(sine.range(.09, .18).slow(4))
  .pan(sine.range(.36, .64).slow(6))
  .color("#FDA4AF")

let vocalHalo = n("<4 5 3 2>/2")
  .scale("C4:major")
  .s("gm_lead_6_voice")
  .vowel("<o a o u>")
  .attack(.35)
  .release(1.8)
  .legato(1.25)
  .room(.88)
  .delay(.42)
  .hpf(500)
  .lpf(2600)
  .gain(.075)
  .pan(sine.range(.44, .56).slow(10))
  .color("#FBCFE8")

let vocalMoan = n("0 ~ [2 3] ~ <4 5> ~ [3 2] ~")
  .scale("C4:major")
  .s("gm_lead_6_voice")
  .vowel("<a o u a>")
  .attack(.26)
  .release(1.55)
  .legato(1.15)
  .gain(sine.range(.18, .34).slow(3))
  .hpf(360)
  .lpf(sine.range(1800, 3600).slow(5))
  .room(.68)
  .delay(.3)
  .pan(sine.range(.4, .6).slow(7))
  .color("#FB7185")

let pad = chords
  .s("gm_epiano1")
  .gain(.1)
  .room(.78)
  .delay(.26)
  .lpf(sine.range(700, 2400).slow(12))
  .color("#93C5FD")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let bass = n("0 ~ <5 4> ~")
  .scale("C2:major")
  .s("sawtooth")
  .legato(.7)
  .lpf(sine.range(220, 900).slow(6))
  .lpq(6)
  .gain(.32)
  .color("#60A5FA")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let bassBuild = n("0 ~ ~ ~")
  .scale("C2:major")
  .s("sawtooth")
  .legato(.6)
  .lpf(500)
  .gain(.24)
  .color("#60A5FA")

let bassDrive = n("0 [0 0] 5 [7 5] 0 [3 5] 7 [5 3]")
  .scale("C2:major")
  .s("sawtooth")
  .legato(.46)
  .distort(1.1)
  .lpf(sine.range(520, 2000).slow(2))
  .lpq(9)
  .gain(.42)
  .color("#60A5FA")

let kickSlow = s("bd ~ bd ~")
  .bank("RolandTR909")
  .gain(.74)
  .shape(.18)
  .lpf(950)
  .color("#9AFEFF")

let kickGhost = s("~ ~ ~ [bd ~]")
  .bank("RolandTR909")
  .gain(.16)
  .shape(.1)
  .lpf(850)
  .color("#67E8F9")

let snareRoom = s("~ sd ~ sd")
  .bank("RolandTR909")
  .gain(.24)
  .room(.56)
  .delay(.08)
  .hpf(900)
  .color("#A7F3D0")

let clapAir = s("~ ~ cp ~")
  .bank("RolandTR909")
  .gain(.18)
  .room(.72)
  .delay(.16)
  .hpf(1600)
  .color("#BBF7D0")

let hatsSoft = s("~ hh ~ [hh hh]")
  .bank("RolandTR909")
  .gain(".08 .06 .1 .05")
  .hpf(6500)
  .pan(sine.range(.38, .62).slow(8))
  .color("#BAE6FD")

let percClick = s("~ rim ~ [~ rim]")
  .bank("RolandTR909")
  .gain(.14)
  .hpf(1800)
  .delay(.18)
  .pan(rand)
  .color("#C4B5FD")

let drumsSlow = stack(kickSlow, kickGhost, snareRoom, clapAir, hatsSoft, percClick)
  ._punchcard({ cycles: 4, labels: 0 })

let kickBuild = s("bd ~ ~ ~")
  .bank("RolandTR909")
  .gain(.46)
  .shape(.14)
  .lpf(850)
  .color("#9AFEFF")

let kickHard = s("bd ~ bd [~ bd]")
  .bank("RolandTR909")
  .gain(.86)
  .shape(.32)
  .lpf(1250)
  .color("#9AFEFF")

let snareHard = s("~ sd ~ sd")
  .bank("RolandTR909")
  .gain(.34)
  .room(.4)
  .delay(.08)
  .hpf(800)
  .color("#A7F3D0")

let clapHard = s("~ cp ~ [cp cp]")
  .bank("RolandTR909")
  .gain(.24)
  .room(.46)
  .delay(.1)
  .hpf(1400)
  .color("#BBF7D0")

let hatsRoll = s("hh*8")
  .bank("RolandTR909")
  .gain(".09 .055 .075 .05")
  .hpf(6800)
  .pan(sine.range(.34, .66).slow(4))
  .color("#BAE6FD")

let openHatLift = s("~ oh ~ oh")
  .bank("RolandTR909")
  .gain(.15)
  .hpf(5200)
  .room(.36)
  .pan(sine.range(.55, .75).slow(6))
  .color("#7DD3FC")

let rimDrive = s("rim(3,8)")
  .bank("RolandTR909")
  .gain(.18)
  .hpf(1800)
  .delay(.12)
  .pan(rand)
  .color("#C4B5FD")

let drumsHard = stack(kickHard, snareHard, clapHard, hatsRoll, openHatLift, rimDrive)
  ._punchcard({ cycles: 4, labels: 0 })

let strings = chords
  .s("gm_string_ensemble_1")
  .gain(.18)
  .room(.7)
  .attack(.08)
  .release(.6)
  .lpf(perlin.range(1200, 4200).slow(4))
  .color("#F0ABFC")
  ._pianoroll({ cycles: 4, labels: 0, fold: 1 })

let intro = stack(
  arpSoft,
  pad
)

let build = stack(
  arpSoft,
  pad,
  kickBuild,
  hatsSoft,
  bassBuild,
  vocalHalo.gain(.45)
)

let drop = stack(
  drumsSlow,
  bass,
  pad,
  arpFlow,
  pianoChords,
  melody,
  tenderAnswer,
  breathVox,
  vocalHalo
)

let breakdown = stack(
  drumsHard,
  bassDrive,
  strings.gain(.4),
  pianoChords.gain(.55),
  vocalMoan,
  vocalHalo.gain(.75)
)

let final = stack(
  drumsSlow,
  bass,
  pad,
  arpFlow,
  pianoChords,
  melody,
  tenderAnswer.gain(.9),
  breathVox.gain(.85),
  vocalHalo.gain(.9),
  strings.gain(.11)
)

let outro = stack(
  arpSoft,
  pad,
  vocalHalo.gain(.35)
)

// 真实播放编曲：保留鼓组、vocal 层和段落动态的原始听感
let audio = arrange(
  [8, intro],
  [8, build],
  [8, drop],
  [24, breakdown],
  [16, final],
  [8, outro]
)

// 背景 pianoroll 的旋律参考层：只放有音高的声部，避免 mixed stack 漏画旋律事件
let visualGuide = arrange(
  [8, stack(arpSoft, pad)],
  [8, stack(arpSoft, pad, bassBuild, vocalHalo.gain(.45))],
  [8, stack(bass, pad, arpFlow, pianoChords, melody, tenderAnswer, breathVox, vocalHalo)],
  [24, stack(bassDrive, strings.gain(.4), pianoChords.gain(.55), vocalMoan, vocalHalo.gain(.75))],
  [16, stack(bass, pad, arpFlow, pianoChords, melody, tenderAnswer.gain(.9), breathVox.gain(.85), vocalHalo.gain(.9), strings.gain(.11))],
  [8, stack(arpSoft, pad, vocalHalo.gain(.35))]
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
