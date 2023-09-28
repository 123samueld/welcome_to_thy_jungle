export default class AnimationController
{
    constructor(context, terrainPieces, character, healthBar, NPCs, scoreMarkrs, grenades, explosion, backgroundLayers, keys, gameSpeed, approachingDawn)
    {
        this.context = context
        this.healthBar = healthBar
        this.characterSpriteWidth = this.characterSpriteHeight = 64 
        this.gameFrame = 0
        this.staggerFrames = 5
        this.terrainPieces = terrainPieces
        this.characterAnimation = "idleRight"
        this.character = character
        this.NPCs = NPCs
        this.scoreMarkrs = scoreMarkrs
        this.enemyFrameX = 0
        this.enemyLoopCounter = 0
        this.grenades = grenades
        this.explosion = explosion
        this.backgroundLayers = backgroundLayers
        this.keys = keys
        this.gameSpeed = gameSpeed
        this.approachingDawn = approachingDawn
        this.outtaTime = false
        this.characterSpriteAnimations = []
        this.characterAnimationStates =
        [
            {
                name: "idleRight",
                frames: 7
            },
            {
                name: "idleLeft",
                frames: 7
            },
            {
                name: "walkRight",
                frames: 9
            },
            {
                name: "walkLeft",
                frames: 9
            },
            {
                name: "jumpRight",
                frames: 5
            },
            {
                name: "jumpLeft",
                frames: 5
            },
            {
                name: "fallRight",
                frames: 5
            },
            {
                name: "fallLeft",
                frames: 1
            },
            {
                name: "lunge",
                frames: 1
            },
            {
                name: "idleShootRight",
                frames: 2
            },
            {
                name: "idleShootLeft",
                frames: 2
            },
            {
                name: "walkShootRight",
                frames: 9
            },
            {
                name: "walkShootLeft",
                frames: 9
            },
            {
                name: "idleThrowRight",
                frames: 5
            },
            {
                name: "idleThrowLeft",
                frames: 5
            },
            {
                name: "walkThrowRight",
                frames: 5
            },
            {
                name: "walkThrowLeft",
                frames: 5
            },
            {
                name: "deadRight",
                frames: 5
            },
            {
                name: "deadLeft",
                frames: 5
            }
        ]
    }

    

    cycleThroughCharacterAnimationFrames()
    {
        this.characterAnimationStates.forEach((state, index) =>
        {
            let frames = {
                loc: []
            }
            for(let i = 0; i < state.frames; i++)
            {
                let positionX = i * this.characterSpriteWidth
                let positionY = index * this.characterSpriteHeight
                frames.loc.push({x: positionX, y: positionY})
            }
        
            this.characterSpriteAnimations[state.name] = frames
        })
    }


    characterAnimationSelector()
    {
        //Idle
        if(
            this.character.velocity.y == 0 &&        
            this.character.actions.facing == "forward" &&
            !this.character.actions.walking && 
            !this.character.actions.jumping && 
            !this.character.actions.shooting && 
            !this.character.actions.lunging &&
            !this.character.actions.throwing  
            ) this.characterAnimation = "idleRight"
        else if(
            this.character.velocity.y == 0 &&        
            this.character.actions.facing == "backward" &&
            !this.character.actions.walking && 
            !this.character.actions.jumping && 
            !this.character.actions.shooting && 
            !this.character.actions.lunging &&
            !this.character.actions.throwing ) this.characterAnimation = "idleLeft"
        //Walk
        if(
            this.character.velocity.y == 0 && 
            this.character.actions.walking &&
            this.character.actions.facing === "forward" 
            ) this.characterAnimation = "walkRight"
        else if(
            this.character.velocity.y == 0 && 
            this.character.actions.walking &&
            this.character.actions.facing == "backward" 
            ) this.characterAnimation = "walkLeft"
        //Jump 
        if(this.character.actions.jumping && this.character.actions.facing == "forward") this.characterAnimation = "jumpRight"
        else if(this.character.actions.jumping && this.character.actions.facing == "backward") this.characterAnimation = "jumpLeft"
        //Fall
        if(
            this.character.velocity.y > 0 && 
            this.character.actions.facing == "forward" && 
            !this.character.actions.shooting &&
            !this.character.actions.lunging) this.characterAnimation = "fallRight"
        else if(
            this.character.velocity.y > 0 && 
            this.character.actions.facing == "backward" && 
            !this.character.actions.shooting &&
            !this.character.actions.lunging) this.characterAnimation = "fallLeft"
        //Lunge
        if(this.character.actions.airbourne && this.character.actions.lunging) this.characterAnimation = "lunge"
        //Idle Shoot
        if(
            this.character.velocity.y == 0  && 
            this.character.velocity.x == 0 && 
            this.character.actions.shooting &&
            this.character.actions.facing == "forward") this.characterAnimation = "idleShootRight"
        else if(this.character.velocity.y == 0  && 
            this.character.velocity.x == 0 && 
            this.character.actions.shooting &&
            this.character.actions.facing == "backward") this.characterAnimation = "idleShootLeft"
        //Walk Shoot
        if(
            this.character.velocity.y == 0  && 
            this.character.velocity.x > 0 && 
            this.character.actions.shooting &&
            this.character.actions.facing == "forward") this.characterAnimation = "walkShootRight"
        else if(
            this.character.velocity.y == 0  && 
            this.character.velocity.x < 0 && 
            this.character.actions.shooting &&
            this.character.actions.facing == "backward") this.characterAnimation = "walkShootLeft"
        //Jump/Fall Shoot
        if(
            this.character.velocity.y > 0  && 
            this.character.velocity.x > 0 && 
            this.character.actions.shooting && 
            !this.character.actions.lunging) this.characterAnimation = "idleShootRight"
        else if(
            this.character.velocity.y > 0  && 
            this.character.velocity.x < 0 && 
            this.character.actions.shooting && 
            !this.character.actions.lunging) this.characterAnimation = "idleShootLeft"
        else if(
            this.character.velocity.y < 0  && 
            this.character.velocity.x > 0 && 
            this.character.actions.shooting && 
            !this.character.actions.lunging) this.characterAnimation = "idleShootRight"
        else if(
            this.character.velocity.y < 0  && 
            this.character.velocity.x < 0 && 
            this.character.actions.shooting && 
            !this.character.actions.lunging) this.characterAnimation = "idleShootLeft"
        //Idle Throw
        if(
            this.character.velocity.y == 0  && 
            this.character.velocity.x == 0 && 
            this.character.actions.throwing &&
            this.character.actions.facing == "forward") this.characterAnimation = "idleThrowRight"
        else if(
            this.character.velocity.y == 0  && 
            this.character.velocity.x == 0 && 
            this.character.actions.throwing &&
            this.character.actions.facing == "backward") this.characterAnimation = "idleThrowLeft"  
        //Walk Throw
        if(
            this.character.velocity.y == 0 && 
            this.character.actions.walking && 
            this.character.actions.throwing &&
            this.character.actions.facing == "forward") this.characterAnimation = "walkThrowRight"
        else if(
            this.character.velocity.y == 0  && 
            this.character.actions.walking && 
            this.character.actions.throwing &&
            this.character.actions.facing == "backward") this.characterAnimation = "walkThrowLeft"
    }

    drawTerrain(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }

    drawCharacterSprite(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }

    adjustHealthBar()
    {
        let healthBarLength = this.character.attributes.health * 3
        this.healthBar.style.width = healthBarLength + "px"
    }

    drawNPCSprite(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }

    drawScoreMarker(x, y, value, alpha)
    {
        var fontSize = 24; // You can adjust the font size as needed
        var fontFamily = "Arial"; // Change this to your desired font family
        this.context.fillStyle = "rgba(255, 0, 0, "+alpha+")"
        this.context.font = fontSize + "px " + fontFamily;
        this.context.fillText(value, x, y)
    }

    drawCharacterDyingSprite(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }

    drawLungeSprite(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }

    drawGrenadeSprite(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.grenades.forEach((grenade) =>{
            grenade.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
        })
    }

    drawExplosionSprite(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.explosion.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }

    drawApproachingDawn(img, sX, sY, sW, sH, dX, dY, dW, dH)
    {
        this.context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }

    takeOff()
    {
        this.terrainPieces[24].position.y--
        console.log("Taking off")
    }

    handleTerrain()
    {
        this.terrainPieces.forEach((terrainPiece) =>
        {
            this.drawTerrain(
                terrainPiece.image, 
                0,
                0,
                terrainPiece.width,
                terrainPiece.height, 
                terrainPiece.position.x,
                terrainPiece.position.y,
                terrainPiece.width,
                terrainPiece.height
            )
        })
    }

    handleCharacterAnimation()
    {
        this.cycleThroughCharacterAnimationFrames()
        this.characterAnimationSelector()
        let characterSpritePos = Math.floor(this.gameFrame/this.staggerFrames) % this.characterSpriteAnimations[this.characterAnimation].loc.length
        let frameX = this.characterSpriteWidth * characterSpritePos
        let frameY = this.characterSpriteAnimations[this.characterAnimation].loc[characterSpritePos].y
        this.adjustHealthBar()
        this.drawCharacterSprite(
            this.character.image, 
            frameX, 
            frameY,
            this.characterSpriteWidth, 
            this.characterSpriteHeight, 
            this.character.position.x, 
            this.character.position.y - 84, 
            this.characterSpriteWidth * 2, 
            this.characterSpriteHeight * 2)
        this.gameFrame++
    }
    
    handleNPCAnimation()
    {
        this.NPCs[0].forEach((enemy) =>
        {
            let frameY
            this.frameX = Math.ceil(this.enemyLoopCounter/90)
            if(this.frameX < 9)this.enemyLoopCounter++
            else this.enemyLoopCounter = 0
            if(enemy.facing == "forward") frameY = 0
            else frameY = enemy.height
            this.drawNPCSprite(
                enemy.image,
                this.frameX * enemy.width,
                frameY,
                enemy.width,
                enemy.height,
                enemy.position.x,
                enemy.position.y - 60,
                enemy.width * 1.75, 
                enemy.height * 1.75
            )
        })
    }

    handleNPCDeathScoreAnimation()
    {
        this.scoreMarkrs.forEach((scoreMarker) =>
        {
            scoreMarker.update()
            this.drawScoreMarker(scoreMarker.position.x, scoreMarker.position.y, scoreMarker.value, scoreMarker.alpha)
            if(scoreMarker.alpha == 0) 
            {
                const scoreMarkerIndex = this.scoreMarkrs.indexOf(scoreMarker)
                this.scoreMarkrs.splice(scoreMarkerIndex,1)
            }
        })
    }

    handleCharacterDyingAnimation(frameX)
    {
        let frameY
        if(this.character.actions.facing == "forward") frameY = 1088
        else if(this.character.actions.facing == "backward") frameY = 1152
        this.drawCharacterDyingSprite(
            this.character.image, 
            frameX * 64, 
            frameY, 
            this.characterSpriteWidth, 
            this.characterSpriteHeight, 
            this.character.position.x, 
            this.character.position.y - 84, 
            this.characterSpriteWidth * 2, 
            this.characterSpriteHeight * 2)
    }

    handleLungeAnimation(frameX)
    {
        this.drawLungeSprite(
            this.character.image, 
            frameX, 
            512,
            this.characterSpriteWidth, 
            this.characterSpriteHeight, 
            this.character.position.x, 
            this.character.position.y - 84, 
            this.characterSpriteWidth * 2, 
            this.characterSpriteHeight * 2
        )
    }

    handleGrenadeAnimation()
    {
        this.grenades.forEach((grenade) =>
        {
            let spinVelocity = Math.floor(grenade.velocity.x/10)
            this.drawGrenadeSprite(grenade.image, grenade.width * spinVelocity, 0, 128, 128, grenade.position.x, grenade.position.y, grenade.width, grenade.height)
        })
    }

    handleGrenadeExplosionAnimation(explosionPosX, explosionPosY, explosionHeight, explosionWidth, frameX)
    {
        this.drawExplosionSprite(
            this.explosion.image, 
            128 * frameX, 
            128, 
            128, 
            128, 
            explosionPosX - (explosionWidth/2.8), 
            explosionPosY - (explosionHeight/2.8), 
            explosionWidth, explosionHeight)
    }

    handleBackgroundAnimation()
    {
        this.backgroundLayers.forEach((backgroundLayer) =>
        {

            if(this.keys.right.pressed && this.character.velocity.x == 0)
            {
                backgroundLayer.velocity = this.gameSpeed
                backgroundLayer.scrollForward = true
            }
            else if(this.keys.left.pressed && this.character.velocity.x == 0)
            {
                backgroundLayer.velocity = this.gameSpeed
                backgroundLayer.scrollForward = false
            }
            else backgroundLayer.velocity = 0
            backgroundLayer.updateThenDrawBackground()  
        })    
    }

    handleApproachingDawn(inGameTimer, resetTimer)
    {
        let gameDuration = 17.5
        let time = (inGameTimer/16)/gameDuration
        let startPositionY = -1000 + time * 6
        this.drawApproachingDawn(this.approachingDawn, 0, 0, 1536, 2000, 0, startPositionY, 1536, 2000)
        if(startPositionY >= -50) this.outtaTime = true
    }
}