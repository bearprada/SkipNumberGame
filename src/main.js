/**
 * Copyright (c) 2014 Famous Industries, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 *
 * @license MIT
 */

/**
 * TweenTransition
 * --------
 *
 * TweenTransition is a state maintainer for a smooth transition between
 * numerically-specified states.
 *
 * In this example, a surface is faded out based on a TweenTransition.
 */

define(function(require, exports, module) {
    var Engine          = require("famous/core/Engine");
    var Surface         = require("famous/core/Surface");
    var Modifier        = require("famous/core/Modifier");
    var Transform       = require("famous/core/Transform");
    var PhysicsEngine   = require('famous/physics/PhysicsEngine');
    var Particle        = require('famous/physics/bodies/Particle');
    var Spring          = require('famous/physics/forces/Spring');
    var Transitionable  = require("famous/transitions/Transitionable");
    var Vector          = require("famous/math/Vector");

    var mainCtx = Engine.createContext();
    var PE = new PhysicsEngine();

    // Create a surface, content is html
    var surface = new Surface({
      size: [200, 200],
      content: "Start",
      classes: ["red-bg"],
      properties: {
        lineHeight: "200px",
        textAlign: "center",
        fontSize: "40px" 
      }
    });

    // Create a physical particle with position (p), velocity (v), mass(m)
    var particle = new Particle({
      mass: 1,
      position: [0, 0, 0],
      velocity: [0, 0, 0]
    });

    // Create a spring that will act on the particle
    var spring = new Spring({
      anchor: [0, 0, 0],
      period: 100,  // <= Play with these values :-)
      length: 0
    });

    var currentIdx = 1;
    var skip_num = 3;
    // Apply a force on the surface when its clicked
    surface.on("click", function (e) {
      currentIdx = next(currentIdx);
      surface.setContent(currentIdx+'');
      particle.applyForce(new Vector(0, 0, -0.005 * 100));
    });

    // Link the spring, particle and surface together
    PE.attach(spring, particle);
    PE.addBody(particle);

    // Create the scene, applying a top level modifier to center
    // the scene vertically in the viewport
    mainCtx.add(new Modifier({ origin: [.5, .5] })).add(particle).add(surface);
    mainCtx.setPerspective(500);

    function next(num) {
      return find_next(num);
    }

    function find_next(num) {
      var count = num + 1;
      while (!(count % skip_num) || count.toString().indexOf(skip_num.toString()) !== -1) {
        count++;
      }
      return count;
    }
});
