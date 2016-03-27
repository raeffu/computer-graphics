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

	//camera.lookAt(scene.position);
	var vertices = [];
	vertices.push ( new THREE.Vector3 ( 0.0, 0.0, 0.0 ) );
	vertices.push ( new THREE.Vector3 ( 1.0, 0.0, 0.0 ) );
	vertices.push ( new THREE.Vector3 ( 1.0, 1.0, 0.0 ) );
	vertices.push ( new THREE.Vector3 ( 0.0, 1.0, 0.0 ) );
	vertices.push ( new THREE.Vector3 ( 0.5, 0.5, 1.0 ) );

	var faces=[];
	faces.push ( new THREE.Face3 ( 0, 3, 2 ) );
	faces.push ( new THREE.Face3 ( 2, 1, 0 ) );
	faces.push ( new THREE.Face3 ( 0, 1, 4 ) );
	faces.push ( new THREE.Face3 ( 1, 2, 4 ) );
	faces.push ( new THREE.Face3 ( 2, 3, 4 ) );
	faces.push ( new THREE.Face3 ( 3, 0, 4 ) );

	pyramideGeometry = new THREE.Geometry();
	pyramideGeometry.vertices = vertices;
	pyramideGeometry.faces = faces;

	var pyramideMaterial = new THREE.MeshBasicMaterial (
		{wireframe: true,
		 color: 0xffffff} );


	var pyramide = new THREE.Mesh( pyramideGeometry, pyramideMaterial );
	
	scene.add( pyramide );

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
