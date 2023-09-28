import RelationshipController from "./RelationshipController.js"
import AnimationController from "./AnimationController.js"
import AIController from "./AIController.js"
import AudioController from "./AudioController.js"
import BackgroundLayer from "./BackgroundLayer.js"
import Character from "./Character.js"
import Terrain from "./Terrain.js"
import Npc from "./Npc.js"
import Missile from "./Missile.js"
import Grenade from "./Grenade.js"
import Explosion from "./Explosion.js"
import KillScore from "./KillScore.js"

let gameTime = performance.now()
let initialisationTime
let gameScore = [0,0,0]
let gameOver = false
let totalKillScore = 0
let killStats = [0, 0, 0, 0]
let scoreStats
let displayIntroScreen = true
let displayControlsScreen = true
let displayCountDownScreen = false
const countDownDigit = document.getElementById("countDownDigit")
let displayGameOverScreen = false
let deathReason = document.getElementById("deathReason")
let playAgainMessage = document.getElementById("playAgainMessage")
const introCoverScreen = document.getElementById("introCoverScreen")
const controlsScreen = document.getElementById("controlsScreen")
const countDownScreen = document.getElementById("countDownScreen")
const gameOverScreen = document.getElementById("gameOverScreen")
const victoryScreen = document.getElementById("victoryScreen")
const thankYouScreen = document.getElementById("thankYouScreen")
const medalImg = document.getElementById("medalImg")
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const soulBarOverlay = document.getElementById("soulBarOverlay")
const soulBar = document.getElementById("soulBar")
const characterImg = document.getElementById("character")
const taurikFireWarriorImg = document.getElementById("taurikFireWarrior")
const venutianMantrapImg = document.getElementById("venutianMantrap")
const gizzardImg = document.getElementById("gizzard")
const grenadeImg = document.getElementById("grenade")
const groundImg = document.getElementById("ground")
const LZImg = document.getElementById("LZ")
const chopperImg = document.getElementById("chopper")
const grass = document.getElementById("grass")
const platformImg = document.getElementById("platform")
const treeLine1 = document.getElementById("treeLine1")
const treeLine2 = document.getElementById("treeLine2")
const treeLine3 = document.getElementById("treeLine3")
const approachingDawn = document.getElementById("approachingDawn")
let terrainPieces
let foulXenos
let NPCs
const scoreMarkers = []
let backgroundLayers
let relationshipController
let animationController
let aiController
let audioController

canvas.height = innerHeight
canvas.width = innerWidth
let gameSpeed = 12
let gameStarted = false
const gravity = 2.5
let characterFacing = "forward"
let characterWalking = false
let characterJumping = false
let characterIsAirbourne = false
let characterShooting = false
let characterLunging = false
let characterThrowing = false
let characterFeeding = false
let teamMembers = []
const scrollForward = false
let startExplosionAnimation = false
let startLungeAnimation = false
let explosionPosX = 0
let explosionPosY = 0
let explosionHeight = 0
let explosionWidth = 0
let explosionLoopCounter = 0
let lungeLoopCounter = 0
let dieLoopCounter = 0
 





const character = new Character(canvas, context, characterImg, gravity,
    {
        strength: 5,
        speed: gameSpeed
    },
    {
        facing: characterFacing,
        walking: characterWalking, 
        airbourne: characterIsAirbourne,
        jumping: characterJumping, 
        shooting: characterShooting, 
        lunging: characterLunging, 
        throwing: characterThrowing,
    },
        teamMembers)
let scrollOffSet = 0
function buildLevel()
{
    const platformStartingPositions = [
        0, 
        500,
        700,

        1600,
        2100,
        2475,

        3100,
        3700,
        3700,

        4500,
        5000,
        5300,

        5800,
        6150,
        6650,

        7350,
        8100,
        8850,

        8850,
        8850,
        9600,

        9700,
        10500,
        11300,

        12000
    ]
    terrainPieces = 
    [
        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[0], y: canvas.height - 30, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[1], y:canvas.height - 300, colour: "#000"}),
        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[2], y: canvas.height - 30, colour: "#000"}),

        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[3], y: canvas.height - 30, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[4], y: canvas.height - 200, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[5], y: canvas.height - 550, colour: "#000"}),

        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[6], y: canvas.height - 30, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[7], y: canvas.height - 650, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[8], y: canvas.height - 250, colour: "#000"}),

        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[9], y: canvas.height - 450, colour: "#000"}),
        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[10], y: canvas.height - 30, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[11], y: canvas.height - 700, colour: "#000"}),

        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[12], y: canvas.height - 30, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[13], y: canvas.height - 650, colour: "#000"}),
        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[14], y: canvas.height - 30, colour: "#000"}),

        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[15], y: canvas.height - 250, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[16], y: canvas.height - 450, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[17], y: canvas.height - 650, colour: "#000"}),
        
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[18], y: canvas.height - 350, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[19], y: canvas.height - 50, colour: "#000"}),
        new Terrain(canvas, context, "ground", groundImg, {w: 500, h: 90, x: platformStartingPositions[20], y: canvas.height - 30, colour: "#000"}),

        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[21], y: canvas.height - 650, colour: "#000"}),
        new Terrain(canvas, context, "platform", platformImg, {w: 500, h: 90, x: platformStartingPositions[22], y: canvas.height - 350, colour: "#000"}),
        new Terrain(canvas, context, "LZ", LZImg, {w: 1000, h: 500, x: platformStartingPositions[23], y: canvas.height - 500, colour: "#000"}),
    
        new Terrain(canvas, context, "chopper", chopperImg, {w: 960, h: 490, x: platformStartingPositions[23] + 100, y: canvas.height - 532, colour: "#000"}),
    ]

    const xenosStartingPositions =
    [
        [1150, 80],
        [2048, 80],
        [2550, 250],

        [2925, 600],
        [3600, 80],
        [4150, 700],

        [4150, 300],
        [4950, 500],
        [5450, 80],

        [5750, 750],
        [6250, 80],
        [6550, 700],

        [7100, 80],
        [7800, 300],
        [8550, 500],

        [9300, 700],
        [9300, 400],
        [9300, 100],

        [10050, 80],
        [10150, 700],
        [10950, 400],

    ]

    let xenosHeightAndWidth = 64
    foulXenos = 
    [
        new Npc(canvas,context,1,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[0][0] ,y:canvas.height- xenosStartingPositions[0][1] ,health:5,stance:"patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[1][0] ,y:canvas.height- xenosStartingPositions[1][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,3,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[2][0] ,y:canvas.height- xenosStartingPositions[2][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[3][0] ,y:canvas.height- xenosStartingPositions[3][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[4][0] ,y:canvas.height- xenosStartingPositions[4][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[5][0] ,y:canvas.height- xenosStartingPositions[5][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),

        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[6][0] ,y:canvas.height- xenosStartingPositions[6][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[7][0] ,y:canvas.height- xenosStartingPositions[7][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[8][0] ,y:canvas.height- xenosStartingPositions[8][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),

        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[9][0] ,y:canvas.height- xenosStartingPositions[9][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[10][0] ,y:canvas.height- xenosStartingPositions[10][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[11][0] ,y:canvas.height- xenosStartingPositions[11][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),

        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[12][0] ,y:canvas.height- xenosStartingPositions[12][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[13][0] ,y:canvas.height- xenosStartingPositions[13][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[14][0] ,y:canvas.height- xenosStartingPositions[14][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),

        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[15][0] ,y:canvas.height- xenosStartingPositions[15][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[16][0] ,y:canvas.height- xenosStartingPositions[16][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[17][0] ,y:canvas.height- xenosStartingPositions[17][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),

        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[18][0] ,y:canvas.height- xenosStartingPositions[18][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[19][0] ,y:canvas.height- xenosStartingPositions[19][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"}),
        new Npc(canvas,context,2,taurikFireWarriorImg, "taurikFireWarrior", gameSpeed,{facing: "backward"}, {w:xenosHeightAndWidth,h:xenosHeightAndWidth,x: xenosStartingPositions[20][0] ,y:canvas.height- xenosStartingPositions[20][1] ,health:5,stance: "patrol", points: 10, causeOfDeath: "NA"})
    ]


    NPCs = [foulXenos]

    backgroundLayers = 
    [
        new BackgroundLayer(context, scrollForward, treeLine3, 0, 0.5, 0),
        new BackgroundLayer(context, scrollForward, treeLine2, 0, 1, 0),
        new BackgroundLayer(context, scrollForward, treeLine1, 0, 1.5, 0),
        new BackgroundLayer(context, scrollForward, grass, 0, 2, 580),
    ]

    relationshipController = new RelationshipController(keys,character, terrainPieces, chopper, NPCs, missiles, grenades, KillScore, killStats, scoreMarkers, totalKillScore, gameScore)
    animationController = new AnimationController(context, terrainPieces, character, soulBar, NPCs, scoreMarkers, grenades, explosion, backgroundLayers, keys, gameSpeed, approachingDawn)
    aiController = new AIController(character, NPCs, terrainPieces)
    audioController = new AudioController(audioEvents)
}

const missiles = []
const grenades = []
const explosion = new Explosion(canvas, context, grenadeImg)

const keys = 
{
    up: { pressed: false },
    right: { pressed: false },
    left: { pressed: false },
    lunge: {pressed: false},
    throw: {pressed: false},
    fire: {pressed: false},
    action: {pressed: false}
}

const audioEvents = 
{
    jump: false,
    lunge: false,
    throw: false,
    fire: false,
    explode: false,
}















addEventListener("keydown", ({keyCode}) => {
    switch(keyCode)
    {
        //Up
        case 87:
            if(!gameOver) keys.up.pressed = true          
            break
        //Right
        case 68:
            if(!gameOver)
            {
                keys.right.pressed = true
                character.actions.facing = "forward"
                character.actions.walking = true
            }
            break
        //Left
        case 65:
            if(!gameOver)
            {
                keys.left.pressed = true
                character.actions.facing = "backward"
                character.actions.walking = true 
            }   
            break
        //Down/Lunge
        case 83:
            if(!gameOver)
            {
                keys.lunge.pressed = true
                startLungeAnimation = true 
            }  
            break      
        //Space/Throw
        case 32:
            if(!gameOver)
            {
                keys.throw.pressed = true
                character.actions.throwing = true
                setTimeout(() =>
                {
                    character.actions.throwing = false
                }, 150)            
                if(grenades.length < 1) 
                {
                    audioEvents.throw = true  
                    setTimeout(() =>
                    {
                        audioEvents.throw = false 
                    }, 50)
                } 
            }
            break
        //Shift/Fire
        case 16:
            if(!gameOver)
            {
                keys.fire.pressed = true
                character.actions.shooting = true
                audioEvents.fire = true
            }   
            break
        // Escape/Pause is key 27
        case 27:
            //if(!gameStarted) startAnimation()
        break
        
        case 69:
            if(!gameOver)
            {
                keys.action.pressed = true
            }
            setTimeout(() =>
            {
                keys.action.pressed = false 
            }, 50)
    }
})

addEventListener("keyup", ({keyCode}) => {
    switch(keyCode)
    {
        //Up
        case 87:
            keys.up.pressed = false 
            break
        //Right
        case 68:
            keys.right.pressed = false
            character.actions.walking = false               
            break
        //Left
        case 65:
            keys.left.pressed = false
            character.actions.walking = false    
            break
        //Down/Lunge
        case 83:
            keys.lunge.pressed = false
            break
        //Space/Throw
        case 32:
            keys.throw.pressed = false
            break
        //Shift/Fire
        case 16: 
            keys.fire.pressed = false
            character.actions.shooting = false
            audioEvents.fire = false
            break
    }
})









function fireControl()
{
    const missileX = character.position.x + (character.width/2)
    const missileY = character.position.y
    const speed = 10
    const damage = 1
    const colour = "red"
    if(character.actions.shooting)
    {
        missiles.push(new Missile(
            canvas, 
            context,
            {
                x: missileX, 
                y: missileY, 
                direction: character.actions.facing, 
                speed: speed, 
                damage: damage, 
                colour: colour
            }))
    }
    missiles.forEach((missile) =>
    {
        if(missile.position.x <= canvas.width)
        {
            missile.draw()
        }
        else
        {
            const missileIndex = missiles.indexOf(missile)
            missiles.splice(missileIndex, 1);
        }
    })
}

function throwControl(timer)
{
    const image = grenadeImg
    const xPos = character.position.x
    const yPos = character.position.y
    const xVel = 25
    const yVel = 25
    const frictionCoeificient = 0.3
    let direction = "forward"
    if(character.actions.facing == "backward") direction = "backward"
    //Frames per second * aprox 16 loops per frame * seconds
    const fuse = 60 * 16 * 1.75
    const explode = false
    const damage = 10
    const blastRadius = 100
    const colour = "black"
    if(character.actions.throwing && grenades.length <= 0)
    {
        character.actions.throwing = true 
        grenades.push(new Grenade(
            canvas, 
            context,
            image,
            gravity, 
            frictionCoeificient, 
            direction,
            {
                xP: xPos, 
                yP: yPos, 
                xV: xVel, 
                yV: yVel
            }, 
            timer,
            fuse,
            explode,
            damage, 
            blastRadius,
            colour))
    }

    grenades.forEach((grenade) =>
    {   
        if(grenade.position.y <= canvas.height) grenade.update()
    })
}










function passIntroScreen()
{
    introCoverScreen.style.display = "none"
    displayIntroScreen = false
}

function passControlsScreen()
{
    controlsScreen.style.display = "none"
    displayControlsScreen = false
}


function passCountDownScreen()
{
    startCountDown()
    countDownScreen.style.display = "block"
    countDownDigit.style.display = "block"
    countDownDigit.innerHTML = "Get to the chopper!!!"
    displayCountDownScreen = true
    let countDownValue = null
    setTimeout(() => 
    {

        terrainPieces = []
        foulXenos = []
        buildLevel()
        soulBarOverlay.style.display = "block"
        countDownScreen.style.display = "none"
        displayCountDownScreen = false
        canvas.style.display = "block"
        startAnimation()
    }, 5000)
}

const animationDuration = 1000
const iterations = 5

function startCountDown()
{
    setTimeout(() =>
    {
        countDownAnimation(0)
    }, 2000)
}

function countDownAnimation(iteration)
{
    let count = 3
    if(iteration == 4) countDownDigit.style.display = "none"
    if(iteration == 3) count = "Go!"
    if(iteration == 2) count = 1
    if(iteration == 1) count = 2
    if(iteration == 0) count = 3
    countDownDigit.innerHTML = count
    countDownDigit.style.animation = `fadeOutAndEnlarge ${animationDuration / 1000}s linear`
		setTimeout(() =>
		{
			countDownDigit.style.animation = ''
			if (iteration < iterations - 1) 
			{
			  setTimeout(() => {
                      countDownAnimation(iteration + 1)
			  	}, animationDuration/100)
			}
		}, animationDuration)
}


function startAnimation()
{
    animate(performance.now())
    initialisationTime = performance.now()
    audioController.jungeBeatsBGM(true)
}



let animationFrameID


function animate(timestamp)
{
    console.log("Height:", canvas.height)
    console.log("Width:", canvas.width)

    context.clearRect(0,0,canvas.width, canvas.height)
    gameTime = Math.abs(initialisationTime - timestamp) 
    animationFrameID = requestAnimationFrame(animate)

    aiController.handleAI()
    animationController.handleApproachingDawn(gameTime, false)
    animationController.handleBackgroundAnimation()
    animationController.handleTerrain()
    animationController.handleNPCDeathScoreAnimation()
    if(grenades.length > 0)  animationController.handleGrenadeAnimation()
    audioController.handleAudio()

    character.update()
    if(keys.right.pressed)scrollOffSet += gameSpeed
    if(keys.left.pressed)scrollOffSet -= gameSpeed
    relationshipController.animateEnemyOnPlatform()
    relationshipController.characterMissileHitsEnemyDetector()
    relationshipController.characterAndEnemyCollisionDetector()
    relationshipController.grenadeBounce()
    relationshipController.grenadeExplode(timestamp)
    if(keys.action.pressed)relationshipController.characterPerformingActions()

    fireControl()
    throwControl(timestamp)
    
    if(keys.right.pressed && character.position.x < 500)
    {
        character.velocity.x = gameSpeed
    }  
    else if(keys.left.pressed && character.position.x > 50)
    {
        character.velocity.x = -gameSpeed
    }
    else
    {
        character.velocity.x = 0
        terrainPieces.forEach((platform) =>
        {
            if(keys.right.pressed) 
                {
                    platform.position.x -= gameSpeed
                }
            else if(keys.left.pressed) 
                {
                    platform.position.x += gameSpeed
                }
        })
        NPCs.forEach((NPCTypeGroup) =>
            {
                NPCTypeGroup.forEach((NPC) =>
                {
                    if(keys.right.pressed) 
                    {
                        if(NPC) NPC.startingPos.x -= gameSpeed
                        if(NPC) NPC.position.x -= gameSpeed 
                    }
                    else if(keys.left.pressed) 
                    {
                        if(NPC) NPC.startingPos.x += gameSpeed
                        if(NPC) NPC.position.x += gameSpeed
                    }
                })
            })
        grenades.forEach((grenade) =>
        {
            if(keys.right.pressed) 
            {
                if(grenade.velocity.x == 0)grenade.position.x -= gameSpeed 
            }
            else if(keys.left.pressed) 
            {
                if(grenade.velocity.x == 0)grenade.position.x += gameSpeed 

            }
            if(grenade.explode) 
            {
                audioEvents.explode = true
                startExplosionAnimation = true
                explosionPosX = grenade.position.x
                explosionPosY = grenade.position.y
                explosionHeight = grenade.height * 4
                explosionWidth = grenade.width * 4
            }
        })
        if(grenades.length == 0) audioEvents.explode = false
        if(keys.right.pressed) explosionPosX -= gameSpeed
        if(keys.left.pressed) explosionPosY += gameSpeed
    }

    if(startLungeAnimation)
    {   
        character.velocity.y += gameSpeed * 2
        character.actions.lunging = true
        let lungeFrameCounter = Math.ceil(lungeLoopCounter / 20)
        if(lungeFrameCounter < 2) lungeLoopCounter++
        audioEvents.lunge = true
        animationController.handleLungeAnimation(
            lungeFrameCounter
        )
        setTimeout(() => 
        {
            audioEvents.lunge = false
        }, 50);
        setTimeout(() => 
        {
            startLungeAnimation = false
            lungeLoopCounter = 0
            character.actions.lunging = false
            audioEvents.lunge = false
        }, 200);
    }

    if(startExplosionAnimation)
    {
        let explosionFrameCounter = Math.ceil(explosionLoopCounter / 4)
        if(explosionFrameCounter < 12)explosionLoopCounter++
        animationController.handleGrenadeExplosionAnimation(
            explosionPosX, 
            explosionPosY,
            explosionHeight,
            explosionWidth,
            explosionFrameCounter)
        setTimeout(() => {
        startExplosionAnimation = false
        explosionLoopCounter = 0
        }, 600);
    }

    terrainPieces.forEach((platform) =>
    {
        if(platform.terrainType == "LZ") 
        {
            if(
                character.position.y + character.height <= platform.position.y+400 &&
                character.position.y + character.height + character.velocity.y >= platform.position.y+400 &&
                character.position.x + character.width >= platform.position.x &&
                character.position.x <= platform.position.x + platform.width
                )
            {
                character.velocity.y = 0
            }
            else if(character.position.y + character.height > canvas.height || character.health <= 0) 
            {
                handleGameOverSquence("fell off")
                character.velocity.y = 0
            }
        }
        else
        {
            if(
                character.position.y + character.height <= platform.position.y &&
                character.position.y + character.height + character.velocity.y >= platform.position.y &&
                character.position.x + character.width >= platform.position.x &&
                character.position.x <= platform.position.x + platform.width
                )
            {
                character.velocity.y = 0
            }
            else if(character.position.y + character.height > canvas.height || character.health <= 0) 
            {
                handleGameOverSquence("fell off")
                character.velocity.y = 0
            }
        }

    })

    if(character.velocity.y != 0) character.actions.airbourne = true
    else character.actions.airbourne = false
    if(keys.up.pressed)
    {
        if(!character.actions.airbourne)
        {
            character.velocity.y -= gameSpeed * 4
            character.actions.jumping = true
            audioEvents.jump = true
        }
    }
    else
    {
        character.actions.jumping = false
        audioEvents.jump = false
    }

    if(character.attributes.health <= 0)
    {
        let frameX = Math.ceil(dieLoopCounter / 5)
        if(frameX < 10) dieLoopCounter++
        animationController.handleCharacterDyingAnimation(frameX)
        handleGameOverSquence("succumbed to his injuries")
    }
    else animationController.handleCharacterAnimation()
    if(animationController.outtaTime)handleGameOverSquence("got caught out after sundown")

    animationController.handleNPCAnimation()
    relationshipController.countGameScore(gameTime)
    let distanceToChopper = Math.abs(character.position.x - (terrainPieces[23].position.x+300))
    if(distanceToChopper < 50)
    {
        gameScore = relationshipController.countGameScore(gameTime)
        animationController.takeOff()
        handlePassedLevelScreen(gameScore)
    }
}











function handleGameOverSquence(reason)
{
    cancelAnimationFrame(animationFrameID)
    removeCanvasSequence()
    setTimeout(() => {
        gameOverScreen.style.opacity = 1;
        audioController.gameOverBMG(false)
        audioController.jungeBeatsBGM(false)

      }, 10)

    deathReason.innerText = "Pvt. Sambo " + reason + " and was consumed by the jungle."
    gameOverScreen.style.display = "block"
    displayGameOverScreen = true
}

let victoryFrameSoundPlayed = false;

function handlePassedLevelScreen(gameScore)
{
    audioController.jungeBeatsBGM(false)
    audioController.takeOff()
    setTimeout(() =>
    {
        cancelAnimationFrame(animationFrameID)
        if(!victoryFrameSoundPlayed) 
        {
            audioController.victoryFrameBGM(true);
            victoryFrameSoundPlayed = true;
        }
        removeCanvasSequence()
        handleVictoryStarParallax()
        setTimeout(() => {
            victoryScreen.style.opacity = 1;
        }, 10)

        victoryScreen.style.display = "block"
        handleScore(gameScore)
    }, 3000)
}

function removeCanvasSequence()
{
    const gameOverFadeOutDuration = 2000
    gameOver = true
    canvas.classList.add("canvas-fade-out")
    setTimeout(() => {
        soulBarOverlay.style.display = "none"
      }, 10)
    setTimeout(()=>
    {
        canvas.style.display = "none"
    }, gameOverFadeOutDuration)  
}

function handleVictoryStarParallax()
{
    const layer1Speed = 0.01
    const layer2Speed = 0.05
    const layer3Speed = 0.15

    const victoryStar11 = document.getElementById("victoryStar11");
    const victoryStar12 = document.getElementById("victoryStar12");
    const victoryStar21 = document.getElementById("victoryStar21");
    const victoryStar22 = document.getElementById("victoryStar22");
    const victoryStar31 = document.getElementById("victoryStar31");
    const victoryStar32 = document.getElementById("victoryStar32");

    let victoryStar1x1 = 0;
    let victoryStar1x2 = -100;

    let victoryStar2x1 = 0;
    let victoryStar2x2 = -100

    let victoryStar3x1 = 0;
    let victoryStar3x2 = -100

    setInterval(() =>
    {
        //Layer 1
        if(victoryStar1x1 > 100) 
        {
            victoryStar1x1 = 0;
        }
        else 
        {
            victoryStar1x1 += layer1Speed;
        }        
        if(victoryStar1x2 > 0) 
        {
            victoryStar1x2 = -100
        }
        else 
        {
            victoryStar1x2 += layer1Speed
        }
        victoryStar11.style.left = victoryStar1x1 + "%";
        victoryStar12.style.left = victoryStar1x2 + "%";
        //Layer 2
        if(victoryStar2x1 > 100) 
        {
            victoryStar2x1 = 0;
        }
        else 
        {
            victoryStar2x1 += layer2Speed;
        }        
        if(victoryStar2x2 > 0) 
        {
            victoryStar2x2 = -100
        }
        else 
        {
            victoryStar2x2 += layer2Speed
        }
        victoryStar21.style.left = victoryStar2x1 + "%";
        victoryStar22.style.left = victoryStar2x2 + "%";
        //Layer 3
        if(victoryStar3x1 > 100) 
        {
            victoryStar3x1 = 0;
        }
        else 
        {
            victoryStar3x1 += layer3Speed;
        }        
        if(victoryStar3x2 > 0) 
        {
            victoryStar3x2 = -100
        }
        else 
        {
            victoryStar3x2 += layer3Speed
        }
        victoryStar31.style.left = victoryStar3x1 + "%";
        victoryStar32.style.left = victoryStar3x2 + "%";
    }, 5);
}

function handleScore(gameScore)
{
    let medalAwarded = "None"
    let scoreStatIndex = 0

    let src
    if(gameScore[2] >= 650)  
    {
        src = "resources/images/medals/03_gold.png"
        medalAwarded = "Gold"
    }
    if(gameScore[2] >= 500 && gameScore[2] < 650) 
    {
        src = "resources/images/medals/02_silver.png"
        medalAwarded = "Silver"
    }
    if(gameScore[2] >= 300 && gameScore[2] < 500) 
    {
        src = "resources/images/medals/01_bronze.png"
        medalAwarded = "Bronze"
    }
    if(gameScore[2] < 300) 
    {
        src = "resources/images/medals/00_none.png"
    }
    medalImg.src = src
    scoreStats = [killStats[0], killStats[1], killStats[2], killStats[3], gameScore[0], gameScore[1], gameScore[2] + "pts", medalAwarded]

    setTimeout(accumulateScoreStats, 2500)

    function accumulateScoreStats() 
    {
        if (scoreStatIndex < scoreStats.length) {
            const currentString = scoreStats[scoreStatIndex] + " "
            const rightCell = document.getElementById(`rightCell${scoreStatIndex + 1}`)
            rightCell.textContent = currentString
            scoreStatIndex++
            if(!rightCell.dataset.linePrinted) 
            {
                audioController.printDataLine()
                rightCell.dataset.linePrinted = "true"
            }

            setTimeout(accumulateScoreStats, 150)
        }
    }
}

function handlePlayingAgain()
{
    resetGameState()
    displayControlsScreen = true
    controlsScreen.style.display = "flex"
    keyPressedCount = 1
    gameOverScreen.style.display = "none"
    victoryScreen.style.display = "none"
    displayGameOverScreen = false
    audioController.gameOverBMG(true)
    audioController.victoryFrameBGM(false)
}

function resetGameState()
{
    canvas.classList.remove("canvas-fade-out")
    character.position.x = 0
    character.position.y = 680
    character.attributes.health = 100
    gameScore = [0,0,0]
    killStats = [0,0,0,0]
    scoreStats = [0,0,0,0,0,0,0]
    for( var i = 1; i <9; i++) 
    {
        const rightCell = document.getElementById(`rightCell${i}`)
        rightCell.textContent = null
        rightCell.removeAttribute('data-line-printed')

    }
    gameOver = false
    animationController.handleApproachingDawn(gameTime, true)
    victoryFrameSoundPlayed = false    
}

function handleThankYouForPlaying()
{
    audioController.victoryFrameBGM(false)
    audioController.gameOverBMG(true)
    audioController.introOutro()
    thankYouScreen.style.display = "block"
    gameOverScreen.style.display = "none"
    victoryScreen.style.display = "none"
}

let keyPressedCount = 0;

addEventListener("keydown", ({ keyCode }) => {
  if (keyCode == 13) {
    if (keyPressedCount === 0) {
      passIntroScreen()
      keyPressedCount++
    } else if (keyPressedCount == 1) {
      passControlsScreen()
      passCountDownScreen()
      keyPressedCount++
    }
  }
  if(gameOver)
  {
    if(keyCode == 89) handlePlayingAgain()
    if(keyCode == 78) handleThankYouForPlaying()
  }
})