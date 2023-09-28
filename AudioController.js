export default class AudioController
{
    constructor(audioEvents)
    {
        this.audioEvents = audioEvents
        this.backGroundMusicClips = 
        {
            jungleBeatsBGM: new Howl({src: ["./Resources/audio/backGroundSound/jungleBeats.mp3"], preload: true}),
            introOutroBGM: new Howl({src: ["./Resources/audio/backGroundSound/introOutro.mp3"], preload: true}),
            gameOverBMG: new Howl({src: ["./Resources/audio/backGroundSound/deathToll.mp3"], preload: true}),
            deepVictory: new Howl({src: ["./Resources/audio/backGroundSound/deepVictory.wav"], preload: true}),
        }
        this.soundBiteObjects = 
        {
            countDown: 
            [
                new Howl({src: ["./Resources/audio/soundBites/countDown/three.mp3"]}), 
                new Howl({src: ["./Resources/audio/soundBites/countDown/two.mp3"]}), 
                new Howl({src: ["./Resources/audio/soundBites/countDown/one.mp3"]}), 
                new Howl({src: ["./Resources/audio/soundBites/countDown/activate.mp3"]}), 
            ],
            flashPistol1: new Howl({src: ["./Resources/audio/soundBites/flashBlast1.mp3"]}),
            jumps: 
            [
                new Howl({src: ["./Resources/audio/soundBites/jump1.mp3"]}),
                new Howl({src: ["./Resources/audio/soundBites/jump2.mp3"]}),
            ],
            lunges:
            [
                new Howl({src: ["./Resources/audio/soundBites/lunge1.mp3"]}),
                new Howl({src: ["./Resources/audio/soundBites/lunge2.mp3"]}),
                new Howl({src: ["./Resources/audio/soundBites/lunge3.mp3"]}),
            ],
            throws:
            [
                new Howl({src: ["./Resources/audio/soundBites/throw1.mp3"]}),
                new Howl({src: ["./Resources/audio/soundBites/throw2.mp3"]})
            ],
            explode:
            [
                new Howl({src: ["./Resources/audio/soundBites/explode1.mp3"]})
            ],    
            takeOff: new Howl({src: ["./Resources/audio/soundBites/takeOff.wav"], preload: true}),
            dataPrintingIntro: new Howl({src: ["./Resources/audio/soundBites/printDataIntro.mp3"], preload: true}),
            dataPrintingLine: new Howl({src: ["./Resources/audio/soundBites/printDataLine.mp3"], preload: true})
        }
    }

    jump(jumpSoundBites)
    {
        if(this.audioEvents.jump) jumpSoundBites[0].play()
    }

    lunge(lungeSoundBites)
    {
        if(this.audioEvents.lunge) lungeSoundBites[2].play()
    }

    throw(throwSoundBites)
    {
        if(this.audioEvents.throw) throwSoundBites[0].play()
    }

    flashPistolFire(flashPistolSoundBite)
    {
        if(this.audioEvents.fire) flashPistolSoundBite.play()
    }

    explode(explosionSoundBites)
    {
        if(this.audioEvents.explode) explosionSoundBites[0].play()
    }

    printDataIntro()
    {
        this.soundBiteObjects.dataPrintingIntro.play()
    }

    printDataLine()
    {
        this.soundBiteObjects.dataPrintingLine.play()
    }

    intro()
    {
        this.backGroundMusicClips.welcome.play()
    }

    introOutro()
    {
        this.backGroundMusicClips.introOutroBGM.play()
    }

    victoryFrameBGM(play)
    {
        if(play) this.backGroundMusicClips.deepVictory.play()
        else this.backGroundMusicClips.deepVictory.stop()
    }

    jungeBeatsBGM(play)
    {
        if(play) this.backGroundMusicClips.jungleBeatsBGM.play()
        else this.backGroundMusicClips.jungleBeatsBGM.stop()
    }

    gameOverBMG(stop)
    {
        this.backGroundMusicClips.gameOverBMG.play()
        if(stop) 
        {
            this.backGroundMusicClips.gameOverBMG.stop()
        }
    }

    takeOff()
    {
        this.soundBiteObjects.takeOff.play()
    }

    handleAudio()
    {
        this.flashPistolFire(this.soundBiteObjects.flashPistol1)
        this.jump(this.soundBiteObjects.jumps)
        this.lunge(this.soundBiteObjects.lunges)
        this.throw(this.soundBiteObjects.throws)
        this.explode(this.soundBiteObjects.explode)
    }

}