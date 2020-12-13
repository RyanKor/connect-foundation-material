//- function readURL(input) {
//-     let formData = {}
//-     if (input.files && input.files[0]) {
//-         var reader = new FileReader();
//-         reader.onload = function(e) {
//-             $('.image-upload-wrap').hide();
//-             $('.file-upload-image').attr('src', e.target.result);
//-             $('.file-upload-content').show();
//-             $('.image-title').html(input.files[0].name);
//-         };
//-         formData = { "image": input.files[0].name}
//-         document.querySelector('.file-upload-input').addEventListener('change', function(e){
//-             axios.post('/image', formData).then((results)=>{
//-                 results.request.onload = function () {
//-                 if (results.status === 200) {
//-                     let url = JSON.parse(results.request).url;
//-                     console.log(url)
//-                     document.querySelector('.image').value = url;
//-                 } else {
//-                     console.error(results.request.responseText);
//-                 }
//-                 };
//-                 })
//-         })
//-         reader.readAsDataURL(input.files[0]);
//-     } else {
//-         removeUpload();
//-     }
//- }
//- function removeUpload() {
//-     $('.file-upload-input').replaceWith($('.file-upload-input').clone());
//-     $('.file-upload-content').hide();
//-     $('.image-upload-wrap').show();
//- }
//- $('.image-upload-wrap').bind('dragover', function () {
//-         $('.image-upload-wrap').addClass('image-dropping');
//-     });
//- $('.image-upload-wrap').bind('dragleave', function () {
//-         $('.image-upload-wrap').removeClass('image-dropping');
//- });
