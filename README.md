# Seoul at Sunset

Credit: Adam Smith; Asiiah Song
(also me, Julian Cady)

The project is inspired by an image of Seoul, Korea by Adam Jang, found here: https://unsplash.com/photos/SS6LxGTin6k

(the 3 shape types used are triangles for the mountains and buildings, rectangle for the ground, and circles for the lights)

Noise functions are used to determine:
	the height and width of the mountain peaks
	height, width, "angle", and position of buildings
	position, size, and color of lights
	
For the lights and buildings, objects are placed along a gridlike pattern which is more compressed the higher up in the image it is.
Using a noise function, I decided whether to place or not place a building/light in any given grid space.

The scene reacts by changing the colors of the lights near the mouse, and increasing the heights of buildings and mountains near the mouse.
I wasn't going for realism here so much as something that felt satisfying to hover over. It's like the city is cheering when the mouse gets near.

I just wanted to make something pretty, which I think I did. I would have had the lights on the ground among rather than behind the buildings,
but that would have required me to generate the lights at the same time as the buildings to draw them in front of some but behind others.
I would have added windows to the buildings, but that would have taken me too long. I also would have liked to add a gradient to the sky,
but making a bunch of tiny lines to achieve it just feels... wrong. I'm also not entirely sure I used randomSeed() correctly,
which might be causing some very minor oddities.