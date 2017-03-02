'use strict';

angular.module('Core').factory('dataService', [
  function () {
	  var config = {
		  apiKey: "AIzaSyBZ1tIZCA-vv-_SKTaCKL3k3rgzyTOj4dI",
		  authDomain: "basesystemproject-dev.firebaseapp.com",
		  databaseURL: "https://basesystemproject-dev.firebaseio.com",
		  storageBucket: "basesystemproject-dev.appspot.com",
		  messagingSenderId: "78101585072"
	  };
	  firebase.initializeApp(config);

	return {
		login: function(email, password) {
        	return firebase.auth().signInWithEmailAndPassword(email, password);
	    },	    
	    getData: function(referenceName, callback, param){
    		var dataRef = firebase.database().ref(referenceName);
				dataRef.on('value', function(snapshot) {
			  	var data = snapshot.val();
			  		callback(data, param);
				});
	    },
	    saveObject:function(referenceName, object, onCompleted){
	    	if(object.id==null)
	    	{
	    		object.id = firebase.database().ref().child(referenceName).push().key;
	    	}

	    	firebase.database().ref(referenceName+'/' + object.id ).set(object, onCompleted);
	    },
		update:function(referenceName, value){
			firebase.database().ref(referenceName).update(value);
		},
		deleteObject:function(referenceName, object){
			firebase.database().ref(referenceName+'/' + object.id ).remove();
		},
		uploadFile:function(referenceName, file, onUploading, onError, onUploaded) {
			var storageRef = firebase.storage().ref();
			var uploadTask = storageRef.child(referenceName).put(file);
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onUploading, onError, function () {
				onUploaded(uploadTask.snapshot.downloadURL);
			});
		},
		deleteUploadedFile:function(referenceName, onDeleted, onError){
			var storageRef = firebase.storage().ref();
			var desertRef = storageRef.child(referenceName);
			desertRef.delete().then(onDeleted).catch(onError);
		}
	};
  }
]);