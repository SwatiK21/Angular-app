/**
 * Created by Swati on 3/2/16.
 */
angular.module('myApp',[
]).controller('MainCtr',function($scope){
       // to check if Angular works for controller
        // $scope.hello = 'world';
        $scope.categories = [
            {"id":0, "name": "Development"},
            {"id":1, "name": "Design"},
            {"id":2, "name": "Exercise"},
            {"id":3, "name": "Humor"}
        ];

        $scope.bookmarks = [
            {"id":0, "title":"AngularJS","url":"http://angularjs.org","category":"Development"},
            {"id":1, "title":"Bootstrap3","url":"http://getbootstrap.com/","category":"Development"},
            {"id":2, "title":"Codeacademy","url":"https://www.codecademy.com","category":"Development"},
            {"id":3, "title":"Coursera","url":"https://www.coursera.org","category":"Design"},
            {"id":4, "title":"w3School","url":"http://www.w3schools.com","category":"Design"},
            {"id":5, "title":"Youtube1","url":"https://www.youtube.com","category":"Exercise"},
            {"id":6, "title":"Google","url":"http://www.google.com","category":"Humor"},
            {"id":7, "title":"Youtube","url":"https://www.youtube.com","category":"Humor"}
        ];

        $scope.currentCategory = null;

        function setCurrentCategory(category){
            $scope.currentCategory = category;

            cancelCreating();
            cancelEditing();
        }

        function isCurrentCategory(category){
           return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        $scope.setCurrentCategory = setCurrentCategory;
        $scope.isCurrentCategory = isCurrentCategory;


         //----------- CRUD   -----------//

        function resetCreateForm(){
            $scope.newBookmark = {
                title: '',
                url: '',
                category: $scope.currentCategory.name
            }
        }

        function createBookmark(bookmark){
            console.log("bookmark:", bookmark);
            bookmark.id = $scope.bookmarks.length;
            $scope.bookmarks.push(bookmark);
            console.log("bookmark:", bookmark);

            resetCreateForm();
        }

        $scope.createBookmark = createBookmark;

        $scope.editedBookmark = null;

        function setEditedBookmark(bookmark){
            $scope.editedBookmark = angular.copy(bookmark);
        }

        function updateBookmark(bookmark){
            var index = _.findIndex($scope.bookmarks, function(b){
                return b.id == bookmark.id;
            });
            $scope.bookmarks[index] = bookmark;

            $scope.editedBookmark = null;
            $scope.isEditing = false;
        }

        function isSelectedBookmark(bookmarkId){
            return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
        }

        $scope.setEditedBookmark = setEditedBookmark;
        $scope.updateBookmark = updateBookmark;
        $scope.isSelectedBookmark = isSelectedBookmark; 


        //----------- Creating and Editing States ----//

        $scope.isCreating = false;
        $scope.isEditing = false;

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;

            resetCreateForm();
        }

        function cancelCreating() {
            $scope.isCreating = false;
        }

        function startEditing() {
            $scope.isEditing = true;
            $scope.isCreating = false;
        }

        function cancelEditing() {
            $scope.isEditing = false;
        }

        function showCreating(){
            return $scope.currentCategory && !$scope.isEditing;
        }
        /*
        function showEditing(){
            return $scope.currentCategory && !$scope.isCreating;
        } */

        function showEditing(){
            return $scope.isEditing && !$scope.isCreating;
        }

        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;
        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.showCreating = showCreating;
        $scope.showEditing = showEditing;

    });
