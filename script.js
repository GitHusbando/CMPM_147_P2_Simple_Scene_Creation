let globalseed = 80085;
let num_mountainpeaks = 30;

function setup() {
  CANVAS_SIZE_X = 600;
  CANVAS_SIZE_Y = 400;
  
  createButton("reroll").mousePressed(() => globalseed++);
  
  createCanvas(CANVAS_SIZE_X, CANVAS_SIZE_Y);
  skycolor = color(200, 140, 120);
  groundcolor = color(10);
  mountaincolor = color(10);
  mountainbackcolor = color(50, 50, 60);
  groundlightcolor = color(255, 200, 200);
  groundlightcolorhover = color(180, 255, 255);
  
  buildingcolorleft = color(30, 35, 40);
  buildingcolorright = color(15);
  buildingcolortop = color(50, 55, 60);
}

function draw() {
  randomSeed(globalseed);
  
  dummy_number = random(); //for some inexplicable reason, the first variable to be assigned random after running randomSeed doesn't change when i reroll??
  
  seed_mountainheight = random();
  seed_mountainwidth = random(); 
  //num_mountainpeaks = 30;
  
  seed_lightssize = random();
  seed_lightsred = random();
  seed_lightsgreen = random();
  seed_lightsblue = random();
  seed_lightsempty = random();
  
  seed_buildingsleft = random();
  seed_buildingsright = random();
  seed_buildingsheight = random();
  seed_buildingsempty = random()
  
  
  
  //kill outlines
  stroke(0,0);
  
  //make sky
  background(skycolor);
  
  //make ground
  fill(groundcolor);
  rect(0, CANVAS_SIZE_Y/3, CANVAS_SIZE_X, CANVAS_SIZE_Y*2/3);
  
  //make mountains
  fill(mountainbackcolor);
  makemountains(0, CANVAS_SIZE_X, CANVAS_SIZE_Y/3, 75, num_mountainpeaks-5, seed_mountainheight-100, seed_mountainwidth-100);
  
  fill(mountaincolor);
  makemountains(0, CANVAS_SIZE_X, CANVAS_SIZE_Y/3, 75, num_mountainpeaks, seed_mountainheight, seed_mountainwidth);
  
  //make ground lights
  //fill(groundlightcolor);
  makegroundlights(0, CANVAS_SIZE_Y/3+5, CANVAS_SIZE_X, CANVAS_SIZE_Y, 5, 0.5, 5, 0.25, groundlightcolor, groundlightcolorhover, 250, seed_lightsempty, 0.4, seed_lightssize, seed_lightsred, seed_lightsgreen, seed_lightsblue);
  
  //make isometric? buildings
  makebuildings(0, CANVAS_SIZE_Y/3+10, CANVAS_SIZE_X, CANVAS_SIZE_Y, 40, 80, seed_buildingsleft, seed_buildingsright, seed_buildingsheight, seed_buildingsempty, 0.4);
  
  /*
  seed_n += 0.1 * seed_mult;
  seed_m += 0.1 * seed_mult;
  seed_s += 0.1 * seed_mult;
  n = noise(seed_n) * width;
  m = noise(seed_m) * height;
  
  background(220);
  circle(n, m, 20*noise(seed_s));
  */
}

function makemountains(start_x, end_x, bottom_y, size_mult, num_triangles, seed_height, seed_width) {
  //figure out the distance between mountains
  mountain_dist = (end_x - start_x) / num_triangles;
  
  //make a bunch of triangles
  current_x = start_x + mountain_dist/2;
  for (let i = 0; i < num_triangles; i++) {
    //find distance to mouse
    dist_to_mouse = Math.sqrt( (mouseX-current_x)*(mouseX-current_x) + (mouseY-bottom_y)*(mouseY-bottom_y) );
    mountainheight = size_mult*noise(seed_height)
    if (dist_to_mouse < 60) {
      mountainheight *= 1.2;
    }
    
    triangle(current_x-size_mult*noise(seed_width), bottom_y, current_x, bottom_y - mountainheight, current_x+size_mult*noise(seed_width), bottom_y);
    
    current_x += mountain_dist;
    seed_height += 1;
    seed_width += 1;
  }
}

function makegroundlights(startx, starty, endx, endy, distance, distanceincrease, circlesize, circlesizeincrease, lightscolor, lightscolorhover, colorvariationmult, seed_empty, emptychance, seed_size, seed_red, seed_green, seed_blue){
  currenty = starty;
  while (currenty < endy){
    currentx = startx;
    while (currentx < endx){
      if (noise(seed_empty) <= emptychance){
        
        //find distance to mouse
        dist_to_mouse = Math.sqrt( (mouseX-currentx)*(mouseX-currentx) + (mouseY-currenty)*(mouseY-currenty) );
        
        //make every light within a certain distance change color
        if (dist_to_mouse < 100){
          light_red = red(lightscolorhover)+colorvariationmult*(noise(seed_red)-0.5);
          light_green = green(lightscolorhover)+colorvariationmult*(noise(seed_green)-0.5);
          light_blue = blue(lightscolorhover)+colorvariationmult*(noise(seed_blue)-0.5);
        }
        else{
          light_red = red(lightscolor)+colorvariationmult*(noise(seed_red)-0.5);
          light_green = green(lightscolor)+colorvariationmult*(noise(seed_green)-0.5);
          light_blue = blue(lightscolor)+colorvariationmult*(noise(seed_blue)-0.5);
        }
        
        fill(light_red, light_green, light_blue);
        circle(currentx, currenty, circlesize* noise(seed_size));
        
        seed_red += 1
        seed_green += 1
        seed_blue += 1
        seed_size += 1;
      }
      seed_empty += 1;
      currentx += distance;
    }
    circlesize += circlesizeincrease;
    distance += distanceincrease;
    currenty += distance;
  }
}

function makebuildings(startx, starty, endx, endy, widthmult, heightmult, seed_left, seed_right, seed_height, seed_empty, chanceofbuilding){
  //size should correlate with y
  //should draw top buildings before bottom ones
  //should have some variation in color
  
  currentx = startx;
  currenty = starty;
  
  while (currenty < endy){
    ymult = currenty/CANVAS_SIZE_Y;
    largeststeepness = 10; //not zero just in case
    while (currentx < endx){
      if (noise(seed_empty) <= chanceofbuilding){
        width1 = widthmult*noise(seed_left)*ymult;
        width2 = widthmult*noise(seed_right)*ymult;
        buildingheight = heightmult*noise(seed_height)*ymult;
        buildingsteepness = (width1+width2)/4*ymult;
        
        dist_to_mouse = Math.sqrt( (mouseX-currentx)*(mouseX-currentx) + (mouseY-currenty)*(mouseY-currenty) );
        if (dist_to_mouse < 20){
          buildingheight *= 2;
        }
        else if (dist_to_mouse < 40){
          buildingheight *= 1.6;
        }
        else if (dist_to_mouse < 60){
          buildingheight *= 1.2;
        }
        
        makebuilding(currentx, currenty, width1, width2, buildingheight, buildingsteepness, buildingcolorleft, buildingcolorright, buildingcolortop);
        currentx += width1 + width2;
        largeststeepness = Math.max(largeststeepness, buildingsteepness);
        seed_left += 2;
        seed_right += 2;
        seed_height += 2;
      }
      else{
        currentx += widthmult*ymult;
      }
      seed_empty += 1;
    }
    currenty += largeststeepness;
    currentx = 0;
  }
  //makebuilding(200, 200, 50, 25, 50, 15, color(200), color(140), color(255))
}

//the buildings can be thought of as a series of triangles
//   i could have done this with polygons, but i forgot they existed
//x and y are the bottom left of the building
function makebuilding(x, y, width1, width2, height, steepness, colorleft, colorright, colortop){
  totalwidth = width1 + width2;
  
  fill(colorleft);
  triangle(x, y, x, y-height, x+width1, y+steepness);
  triangle(x, y-height, x+width1, y-height+steepness, x+width1, y+steepness);
  
  fill(colorright);
  triangle(x+width1, y+steepness, x+width1, y-height+steepness, x+totalwidth, y-height);
  triangle(x+width1, y+steepness, x+totalwidth, y-height, x+totalwidth, y);
  
  fill(colortop);
  triangle(x, y-height, x+width2, y-height-steepness, x+width1, y-height+steepness)
  triangle(x+totalwidth, y-height, x+width2, y-height-steepness, x+width1, y-height+steepness)
}