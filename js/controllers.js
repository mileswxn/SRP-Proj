/**
 * Created with JetBrains WebStorm.
 * User: wangxunn
 * Date: 9/4/13
 * Time: 12:20 PM
 */


/* Set up localhost debug request */
if (location.host !== 'dsp-teamlemon.cloud.dreamfactory.com'){
    requestURL = 'paragraphs.json';
}else{
    requestURL = location.protocol + '//' + location.host +'/rest/db/SRPParagraph';
}

function ParagraphController($scope, $http){
    $http({
        method: 'GET',
        url: requestURL,
        headers:{"X-DreamFactory-Application-Name":"MasterProject"},
        cache: false
    })
        .success(function(data, status, headers, config){
            $scope.activePid = null;
            $scope.paragraphs = data.record;
            $scope.active = function(p){
                if ($scope.activePid === p.id){
                    $scope.activePid = null;
                    p.cls="";
                }else{
                    $scope.activePid = p.id;
                    p.cls="active";
                }
            };
        });
}

function CommentsController($scope){
    $scope.comments = [];
    $scope.addComment = function (newCommentText) {
        if (!newCommentText) return;
        $scope.comments.push({text: newCommentText, isRemoved: false, active: false});
        $scope.newComment = "";
    };
    $scope.removeComment = function(comment){
        var index = $scope.comments.indexOf(comment);
        $scope.comments.splice(index, 1)
    };
    $scope.activeComment = function(comment){
        comment.active = !comment.active;
    };


}
