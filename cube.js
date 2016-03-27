var camera, orbitControls, scene, renderer;

init();
animate();

function init()
{
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45,
                window.innerWidth / window.innerHeight,
                0.1, 1000)  ;
  camera.position.x = -10;
  camera.position.y = 10;
  camera.position.z = 10;

  // create a render and set the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x00000000 );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
  orbitControls.autoRotate = true;
  orbitControls.enableZoom = true;

  //    4-------7
  //   /|      /|
  //  / |     / |
  // 5--|----6  |
  // |  0----|--3
  // | /     | /
  // 1-------2

  //camera.lookAt(scene.position);
  var vertices = [];
  // bottom square
  vertices.push ( new THREE.Vector3 ( 0.0, 0.0, 0.0 ) ); // 0
  vertices.push ( new THREE.Vector3 ( 1.0, 0.0, 0.0 ) ); // 1
  vertices.push ( new THREE.Vector3 ( 1.0, 1.0, 0.0 ) ); // 2
  vertices.push ( new THREE.Vector3 ( 0.0, 1.0, 0.0 ) ); // 3
  // top square
  vertices.push ( new THREE.Vector3 ( 0.0, 0.0, 1.0 ) ); // 4
  vertices.push ( new THREE.Vector3 ( 1.0, 0.0, 1.0 ) ); // 5
  vertices.push ( new THREE.Vector3 ( 1.0, 1.0, 1.0 ) ); // 6
  vertices.push ( new THREE.Vector3 ( 0.0, 1.0, 1.0 ) ); // 7

  var faces=[];
  faces.push ( new THREE.Face3 ( 0, 3, 2 ) );
  faces.push ( new THREE.Face3 ( 2, 1, 0 ) );

  faces.push ( new THREE.Face3 ( 5, 6, 2 ) );
  faces.push ( new THREE.Face3 ( 2, 1, 5 ) );

  faces.push ( new THREE.Face3 ( 6, 7, 3 ) );
  faces.push ( new THREE.Face3 ( 3, 2, 6 ) );

  faces.push ( new THREE.Face3 ( 7, 4, 0 ) );
  faces.push ( new THREE.Face3 ( 0, 3, 7 ) );

  faces.push ( new THREE.Face3 ( 5, 1, 0 ) );
  faces.push ( new THREE.Face3 ( 0, 4, 5 ) );

  faces.push ( new THREE.Face3 ( 4, 7, 6 ) );
  faces.push ( new THREE.Face3 ( 6, 5, 4 ) );

  var cubeGeometry = new THREE.Geometry();
  cubeGeometry.vertices = vertices;
  cubeGeometry.faces = faces;

  var cubeMaterial = new THREE.MeshBasicMaterial (
    {wireframe: true,
     color: 0xffffff} );


  var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

  scene.add( cube );

  var axes = new THREE.AxisHelper( 1.5 );
  scene.add ( axes );
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize()
{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate()
{
    requestAnimationFrame( animate );

  // required if controls.enableDamping = true,
  // or if controls.autoRotate = true
    orbitControls.update();
    //stats.update();
    render();
}
