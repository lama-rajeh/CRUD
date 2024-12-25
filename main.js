var courseName = document.getElementById('courseName')
var courseCategory = document.getElementById('courseCategory')
var coursePrice = document.getElementById('coursePrice')
var courseDescription = document.getElementById('courseDescription')
var courseCapacity = document.getElementById('courseCapacity')
var addbtn = document.getElementById('click')
var data = document.getElementById('data')
var search = document.getElementById('search')
var currentIndex = 0
var isNameValid = false
var isCatValid = false
var isPriceValid = false
var isDesValid = false
var isCapacityValid= false
///عملنا مصفوفة واستدعينا فيها الفنكشن 
var courses 
if(JSON.parse(localStorage.getItem('courses'))===null){
  courses = []
  }else{
    courses = JSON.parse(localStorage.getItem('courses'))
  }

displayData()
 checkInputs()

function checkInputs(){
  if (isNameValid && isCatValid && isDesValid && isCapacityValid &&isPriceValid ){
    addbtn.removeAttribute('disabled')
  }else{
    addbtn.setAttribute('disabled' , 'disabled')

  }
}
var update = document.getElementById('update')
update.style.display = 'none'
addbtn.onclick = function (e) {
    e.preventDefault()
    addCoures()
    resetInput()
    displayData()
    console.log(courses);
}
///create course ريسيت 
///هون اضفنا القيمة للعنصر 
function addCoures() {
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
    }
    ///هون اضافنا القيمة الجديدة للقيمة القديمة باستخدام البوش
    courses.push(course)
    localStorage.setItem('courses' , JSON.stringify(courses))
    //بعد ما اعمل بوش على المصفوفة روح اعرضله هاي الاليرت   
    Swal.fire({
        position: "center",
        icon: "success",
        title: "course added successfully",
        showConfirmButton: false,
        timer: 1500
      });
}
/// قمنا بتصفير العناصر بعد ما خلصنا تدخيل المعلومات 
function resetInput() {
    courseName.value = ''
    courseCategory.value = ''
    courseCapacity.value = ''
    coursePrice.value = ''
    courseDescription.value = ''
}
// read data عملية عرض في tbody
//  المفروض شو يصير ؟ انو التيبل يتعبى مجموعة من السطور كل سطر يمثل اوبجكت وكل اوبجكت يمثل كورس كمان كل سطور يكون 
// جواته مجموعة من ال تي دي وكل تي دي فيها هاي البيانات وهاي الاسطر نعبيتها جوا الفنكشن 
//عندي كولكشن بدي اعرض الداتا الي فيها او الاوبجكت الي فيها بعمل فور لوب
//read data
function displayData() {
    var result = `` //  استخدمت هون الباكتك (تمبلت ريترلز) لانها بتوفر ميزات عديدة وهي انزل سطر جوا لسترينج اسمها سترينج اندر بوليشن واحقن قيم المتغيرات جول لسترينج
    for (var i = 0; i < courses.length; i++) {
        result += `
        <tr>
            <td>${i + 1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>    
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>  
        </tr>
        
        `
    }
    data.innerHTML = result
}
//delelte all
//بما انه رح استخدمه هون بس ف مباشرة بعمل دوكيومنت بدون ما اعمل فايربل وبعمله ايفينت
document.getElementById('deletBtn').onclick = function () {
    //فكرة الدليت احذف كل شي في المصفوفة يعني عندي كورسس اريه بفضيها بكتب كورسس وبساويها ب اريه فاضيه وبما انه فضيت الكورسس لازم افضي التيبل اي الجدول
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      //هون بروح على النتيجة اذا كونفيرمد يعني يس معناتو بفضيلي الاري والتيبل 
    }).then((result) => {
        if (result.isConfirmed) {
            courses = []
            localStorage.setItem('courses' , JSON.stringify(courses))
            data.innerHTML = ''
         //هون بعرضي اليرت جديدة مكتوب فيها ديليتت
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
   
}
//delet
// فنكشن بعمل دليت لكورس والمفروض انه هاد الفنكشن بستقبل مني الاندكس بروح على الاون كليك بستدعيه 
function deleteCourse(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
        courses.splice(index, 1)
        localStorage.setItem('courses' , JSON.stringify(courses))
        displayData()
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
  
}
//search
//عندي طرقتين للبحث خلال عملية الكتابة مباشرة بوخد القسمة وبقارنها او بكزن عندي كبسة وبقارن بالاشياء الي عندي فاحنا رح نعمل الخيار الاول 
// نمسكت الانوبت الي اسمه سيرتش ونعمله ايفينت 
//شو الايفينت الي بدي اعالجها على هاد الانبوت في عندي الايفينت الي الهن علاقة بالكيبورد
/**
 * onkeypress هاي قريبا رح تنحذف deprcated كل ما اكبس كبيه بحسبها حرف وبعدها
 * onkeydown برضو كل كبسه بحسبها وبعدها
 * onkeyup ميزتها بحسب الحروف لما اكبس واشيل ايدي عن الكيبورد لو ضليت كابس عطول بحسبها حرف عبين ما اشيل ايدي
 */
/**
 * الفرق بين onkeypress و onkeydown
 * onkeydown : بتشمل جميع مفاتيح الكيبور بطعي اشارة في كونسينت
 * onkeypress : ما بتقبل بعض المفاتيح زي الكوترل وال الت والاسهم 
 */
// هون بدي اجيب الفاليو تبعتها بالانبوت بدي اقارنهابلف عليها اوبجكت اوبجت المفروض يكون عندي فور لوب
search.onkeyup = function () {
    var result = ``
    console.log(search.value);
    for (var i = 0; i < courses.length; i++) {
        //includes:
        //هون استخدمنا ال اينكلود عشان يكون البحث جزء من القيمة يعني هل تحتوي على القيمة الي حطيتها جوا هاد الانبوت اذا اه اعرضي هاي الداتا الي هي المعلومات الي بالجدول 
        //toLowerCase() & toUpperCase()
        //لازم احكم القيمة الي بالسيرتش الي بالبحث اما بحولها ل لور كيس كلهمسمول لتر او افر كيس كلهم كبيتل لتر وبقارنها مع القيمة الموجودة في الكورسيسز ولكن بحول النيم الموجود فيه اي الاوبجكت اما سمول او كبيتل يعني التنتين بنفس الليفل
        if (courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())) {
            result += `
    <tr>
        <td>${i + 1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>    
        <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>  
    </tr>
    `
        }
        data.innerHTML = result
    }

}
//update
function getCourse(index){
console.log(index);
//كيف بدي امسك الكورس عندي مصفوفة وعندي مجموعة من الكورسيس بعرف متغير بسميه كورس بوخد منه البيانات بساي كورس المصفوفة كلها 
// هيك فعلا رحت على المصفوفة اخترت منها الكورس الي يوزر كبس عليه بنائا على قيمة الاندكس بعد ما نمسك البينات بدنا نعبيها كيف ؟ هاي الايلمن ماسكينها بمجموهة من المتغيرات الي هي الكورس نيم بدي اروح على الفايلو وبخليه يساوي الكورس الي انا جبته اي عملته دوت الكورس نيم 
currentIndex= index
var course = courses[index]
console.log(course);
courseName.value = course.courseName
courseCategory.value = course.courseCategory
coursePrice.value = course.coursePrice
courseDescription.value = course.courseDescription
courseCapacity.value = course.courseCapacity
update.style.display = 'inline'
addbtn.style.display = 'none'
}
// احنا وينتا بدنا نشغل هاد الفنكشن فعليا ؟
// فلازم احكيله هاي الابديت لما اجي اكبس عليها خليها تفعلي هاد الفنكشن فلازم امسك نفس الابوجكت فانا بحاجة ل اندكس فبعرف متغير جلوبل الكل يشوفه بسميه كارنت اندكس وبساويه بالاندكس الي انا جبته بالجت كورس وبعرف الكارنت ايندكس واعطيت الكارنت قيمه صفر او بدون قيمه لانه ما بنشغل كود الابديت الا تنعطيه قيمة الاندكس
update.onclick = function(e){
  e.preventDefault()
  // طبع قيمتين الكورس القديم والجديد التعديل صح  بس ما تعدلت قدامي لانه اي حركة بعدلها على الاري لازم ارجع اعمل دسبلاي لهاي الاري لانه صار تغير بشي عامله دسبلاي من قبل فبرجع بحكيلو اعمله دسبلاي 
updateCourse()
  displayData()
update.style.display = 'none'//نغير البوتن 
addbtn.style.display = 'inline'
resetInput() //بنعمل تنظيف للبيانات نشيلهن بعد ما نعمل ابديت
}


function updateCourse(){
  // فانا على الاونكليك بدي استخدم الكرنت ايندكس المفروض انه لما اعبي البيانات ونضيفهن واعمل اد كورس واكبس على الابديت بجيبهم بالبيانات بدي ارجع اعبي الاندكس فلما اكبس على الابديت المفروض اوخد هاي الانبوت كمان مرة كيف عملنا بالاادد رحنا عملنا اوبجكت وسمينا كورس وحطينا فيه الكورس وكورس نيم والجاتوكري نفس الاشي بدنا نجيب هاي الفاليوز من الانبوت ونخزنها مكان الكورس الي اله الاندكس الي حطيناه بالكارنت ايندكس
var course = {// احنا صار عنا كورس جديد بدنا نحطه مكان الكورس الي موجود بالكورسيس
  courseName: courseName.value,
  courseCategory: courseCategory.value,
  coursePrice: coursePrice.value,
  courseDescription: courseDescription.value,
  courseCapacity: courseCapacity.value,
}

//ممكن اليوزر ما يعدل على كل هاي البيانات فانا ما بقدر استبدل الكورس كلو مكان الكورس الي موجود بالاريه يمكن اعدل شغله وحده عشان هيك بروح على الكورسيس الي الها كارنت ايندكس الي جواتها كورس نيم الي اخره واخلها تساوي قيمة الموجودة في هاد الاوبجكت 
//ممكن شو نعمل نوخد النيم تبع الكورس القديم ونضيفه على التايتل المفروض نعملها قبل ما اخليه يساوي القيمة الي جبتها من الانبوت لازم اعرف متغير 
var pervName = courses[currentIndex].courseName
courses[currentIndex].courseName = course.courseName
courses[currentIndex].courseCategory = course.courseCategory
courses[currentIndex].coursePrice = course.coursePrice
courses[currentIndex].courseDescription = course.courseDescription
courses[currentIndex].courseCapacity = course.courseCapacity
localStorage.setItem('courses' , JSON.stringify(courses))
//هيك انا فعليا عدلت القيمة الموجودة في هاي الاريه او الكورس الي بدي عليه بناءا على الاشي الموجود في هاد الاوبجكت
Swal.fire({
  position: "center",
  icon: "success",
  title: `${pervName} updated successfully`,// هون بنضيف قيمة الكورس نيم بس بحطها بتمبلت ليترل الي هي باكت تيك عشان نستخدم فيها متغير
  showConfirmButton: false,
  timer: 1500
});
}
//validation

 /**
  * name 
  * start with capital 
  * 3-10
  * regex /^[A-Z][a-z]{2,10}$/ هيك الريكيولر او البترن صحيح 
  */
 //بدي اشيك عليه وهو بكتب متل السيرتش على اون كي اب 
 var nameAlert = document.getElementById('nameAlert')
 /**nameAlert.style.display = 'none'*///   هون بدلت هاي ب الانر اينر اتش تي ام ال عشان يطلع زابط وما يرمش الموقع
 courseName.onkeyup = function(){
  var pattern = /^[A-Z][a-z]{2,10}$/ 
   if(pattern.test(courseName.value)){
    isNameValid = true
    nameAlert.innerHTML=" "
    if(courseName.classList.contains('is-invalid')){
      courseName.classList.replace('is-invalid', 'is-valid')
    }
    courseName.classList.add('is-valid')// اذا تحقق الشرط روح على كورس نيم في الها كلاس ليست الها ليست من لكلاسات بدخل عليها وبضيفيلها كلاس از فاليد جبت كل كلاسات تبعون النيم 
    /**nameAlert.style.display = 'none'*/
   } else{
    isNameValid = false
    nameAlert.innerHTML = "*please start capital and name must be between 3 and 10 chars"
    /**nameAlert.style.display = 'block'*/
    if(courseName.classList.contains('is-valid')){
      courseName.classList.replace('is-valid', 'is-invalid')
    }
    courseName.classList.add('is-invalid')
   
   }
checkInputs()
 }

  /**
  * category
  * start with capital 
  * 3-20
  * no number
  * regex /^[A-Z][a-z]{2,20}$/ هيك الريكيولر او البترن صحيح 
  */
 var catAlert = document.getElementById('catAlert')
 catAlert.style.display ='none'
 courseCategory.onkeyup = function(){
  var pattern = /^[A-Z][a-z]{2,20}$/ 
   if(pattern.test(courseCategory.value)){
    catAlert.style.display ='none'
    isCatValid = true
    if(courseCategory.classList.contains('is-invalid')){
      courseCategory.classList.replace('is-invalid', 'is-valid')
    }
    courseCategory.classList.add('is-valid')// اذا تحقق الشرط روح على كورس نيم في الها كلاس ليست الها ليست من لكلاسات بدخل عليها وبضيفيلها كلاس از فاليد جبت كل كلاسات تبعون النيم 
   
   } else{
    catAlert.style.display ='block'
    isCatValid = false
    if(courseCategory.classList.contains('is-valid')){
      courseCategory.classList.replace('is-valid', 'is-invalid')
    }
    courseCategory.classList.add('is-invalid')
   
   }
checkInputs()
 }

 
  /**
  * price
  * 3-4
  * number
  * regex /^[0-9]{3,4}$/ هيك الريكيولر او البترن صحيح 
  */
 var priceAlert = document.getElementById('priceAlert')
 priceAlert.style.display='none'
 coursePrice.onkeyup = function(){
  var pattern = /^[0-9]{3,4}$/ /**  /^[5-9][0-9$||100$/ بقدر هيك اكتبها */
   if(pattern.test(coursePrice.value) && (coursePrice.value >= 100)){
    priceAlert.style.display='none'
    isPriceValid = true
    if(coursePrice.classList.contains('is-invalid')){
      coursePrice.classList.replace('is-invalid', 'is-valid')
    }
    coursePrice.classList.add('is-valid')// اذا تحقق الشرط روح على كورس نيم في الها كلاس ليست الها ليست من لكلاسات بدخل عليها وبضيفيلها كلاس از فاليد جبت كل كلاسات تبعون النيم 
   
   } else{
    isPriceValid = false
     priceAlert.style.display='block'
    if(coursePrice.classList.contains('is-valid')){
      coursePrice.classList.replace('is-valid', 'is-invalid')
    }
    coursePrice.classList.add('is-invalid')
   
   }
checkInputs()
 }

 
  /**
  * desc
  * start with capital 
  * 3-120
  *  number
  * regex /^[A-Z][A-Za-z0-9\s]{2,120}$/ هيك الريكيولر او البترن صحيح 
  */
 courseDescription.onkeyup = function(){
  var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/ 
   if(pattern.test(courseDescription.value)){
    isDesValid = true
    if(courseDescription.classList.contains('is-invalid')){
      courseDescription.classList.replace('is-invalid', 'is-valid')
    }
    courseDescription.classList.add('is-valid')
   } else{
    isDesValid = false
    if(courseDescription.classList.contains('is-valid')){
      courseDescription.classList.replace('is-valid', 'is-invalid')
    }
    courseDescription.classList.add('is-invalid')
   
   }
checkInputs()
 }
 
 
  /**
  * capacity
  *23-3
  * number
  * regex /^[0-9]{2,3}$/ هيك الريكيولر او البترن صحيح 
  */
 courseCapacity.onkeyup = function(){
  var pattern = /^[0-9]{2,3}$/ 
   if(pattern.test(courseCapacity.value)){
    isCapacityValid = true
    if(courseCapacity.classList.contains('is-invalid')){
      courseCapacity.classList.replace('is-invalid', 'is-valid')
    }
    courseCapacity.classList.add('is-valid')  
   
   } else{
    isCapacityValid = false
    if(courseCapacity.classList.contains('is-valid')){
      courseCapacity.classList.replace('is-valid', 'is-invalid')
    }
    courseCapacity.classList.add('is-invalid')
   
   }
checkInputs()
 }