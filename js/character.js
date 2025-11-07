//player class

class Player {
  constructor (x,y) {
    //current position
    this.x = x;
    this.y = y;
    //character size
    this.w = 48; //same as spritesheet
    this.h = 48; //same as spritesheet

    // velocity (number added to character x/y)
    this.vx = 0; //initialize velocity x
    this.vy = 0; //inistalize velocity y
    this.state="idle"
    
    //movement speed
    this.moveSpeed = 4;
    this.jumpForce = -10;
    this.jumpHoldBoost = -0.4;
    
    this.jumpPressed = false; //prevents infinite jumping
    
    //airborne detection
    this.airbone = false;
    this.airtime = 0;
    this.grounded = false;
    
    this.walkImg = walkImg;
    this.idleImg = idleImg;
    
    this.currentFrame = 0;
    
  }
  
movementControls(){
  
// L + R movement
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -this.moveSpeed;
      this.facing=-1;//facing left
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = this.moveSpeed;
      this.facing = 1; //facing right
    } else {
      this.vx = 0;
    }

    this.x += this.vx;
  
// jump movement, if statement includes prevention of perma-jump
  
   if (keyIsDown(32)) { 
      if (!this.jumpPressed && this.grounded) // perma-jump prevention
      
      {
        this.vy = this.jumpForce;
        this.grounded = false;
      }
      this.jumpPressed = true;
    } else 
      this.jumpPressed = false; 
}

//for stuff that needs to be updated when frame changes

update() {
    
//gravity 
//updates every frame, changes y coord until player collides with ground
    this.vy += 0.8;
    this.y += this.vy;


// detects if player y is with ground every frame, then updates it to groundY if not
    if (this.y >= groundY) {
      this.y = groundY;
      this.vy = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

// hold jump to go higher
    if (keyIsDown(32) && this.vy < 0) {
      this.vy += this.jumpHoldBoost;
    }
    
//update character state for animations, return to idle if not jumping or moving
  if (!this.grounded) this.state = "jump";     
  else if (this.vx !== 0) this.state = "walk"; 
  else this.state = "idle";  
}

//displays player
display() {
  
  // transform for direction flip
  push(); 
  // move origin to player's top-left
  translate(this.x, this.y - this.h); 
  
// flip for left
  if (this.facing === -1) scale(-1, 1); 
//idle image
  if (this.state === "idle") {
    image(this.idleImg, -this.w / 2, 0, this.w, this.h);
  }
  else if (this.state === "walk") {
    
    // floor function so that sx rounds to a whole number 
    // for animation alignment
    
    let sx = floor(this.currentFrame) * frameWidth;
    let sy = 0;
    image(
      this.walkImg,
      -this.w / 2,
      0,
      this.w,
      this.h,
      sx,
      sy,
      frameWidth,
      frameHeight
    );
    this.currentFrame += .25;
    //loop animation
    if (this.currentFrame >= walkFrames) this.currentFrame = 0;
  } 
  else if (this.state === "jump") {
    image(this.idleImg, -this.w / 2, 0, this.w, this.h);
  }
  pop(); // back to original coords system
  }
}




