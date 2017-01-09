angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {};

  $http({
    method: 'GET',
    url: '/api/albums/' + $routeParams.id
  }).then(function successCallback(json) {
    vm.album = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.editSong = function (song) {
    console.log('song is', song)
    $http({
      method: 'PUT',
      url: '/api/albums/'+ $routeParams.id + '/songs/' + song._id,
      data: song
    }).then(function successCallback(json) {
      console.log('edit song worked.', json);
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deleteSong = function (song) {
    console.log('delete test')
    $http({
      method: 'DELETE',
      url: '/api/albums/'+ $routeParams.id + '/songs/' + song._id,
    }).then(function successCallback(json) {
      console.log("song is ", vm.songs)
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index,1)
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }

  vm.createSong = function (song) {
    console.log('song is', song)
    $http({
      method: 'POST',
      url: '/api/albums/'+ $routeParams.id + '/songs',
      data: vm.newSong
    }).then(function successCallback(newSong) {
      vm.album.songs.push(newSong.data);
      console.log('create song worked.', newSong);
    }, function errorCallback(response) {
      console.log('There was an error creating the data', response);
    });
  }

}
