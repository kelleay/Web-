
$(document).ready(function() {
    $('#upload-form').on('submit', function(e) {
        e.preventDefault(); // 阻止默认表单提交

        const formData = new FormData(this); // 创建 FormData 对象
        $.ajax({
            url: 'http://localhost:8080/img/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                alert("上传成功!")
                $('#upload-form')[0].reset(); // 重置表单
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("上传失败")
                console.error('上传失败:', textStatus, errorThrown); // 处理上传失败的响应
            }
        });
    });
});

 // 按时间查询
 document.getElementById('query-button-time').addEventListener('click', function() {
    const time = document.querySelector("#query-date").value
    const photoContainer = document.querySelector("#photo-container")
    photoContainer.innerHTML = ""
    $.ajax({
        url: 'http://localhost:8080/img/querybytime', 
        type: 'POST',
        data: JSON.stringify({ time: time }), // 封装成对象并转为 JSON 字符串
        contentType: 'application/json', // 设置内容类型为 JSON
        success: function(res) {
            for(let path of res){
                const imgElement = document.createElement('img'); // 创建 img 元素
                imgElement.src = `http://localhost:8080/uploads/${path.img_path}`; // 设置图片源
                imgElement.alt = 'Photo'; // 设置 alt 属性
                imgElement.style.width = '160px'; // 设置宽度
                imgElement.style.margin = '10px'; // 设置边距
                // 将 img 元素添加到容器中
                photoContainer.appendChild(imgElement);
            }
        },
        error: function(err) {
            alert("查询失败")
            console.error('查询失败:', err); // 处理上传失败的响应
        }
    });
});

// 按地点查询
document.getElementById('query-button-location').addEventListener('click', function() {
    const location = document.querySelector("#query-location").value
    const photoContainer = document.querySelector("#photo-container")
    photoContainer.innerHTML = ""
    $.ajax({
        url: 'http://localhost:8080/img/querybylocation', 
        type: 'POST',
        data: JSON.stringify({ location: location }), // 封装成对象并转为 JSON 字符串
        contentType: 'application/json', // 设置内容类型为 JSON
        success: function(res) {
            for(let path of res){
                const imgElement = document.createElement('img'); // 创建 img 元素
                imgElement.src = `http://localhost:8080/uploads/${path.img_path}`; // 设置图片源
                imgElement.alt = 'Photo'; // 设置 alt 属性
                imgElement.style.width = '160px'; // 设置宽度
                imgElement.style.margin = '10px'; // 设置边距
                // 将 img 元素添加到容器中
                photoContainer.appendChild(imgElement);
            }
        },
        error: function(err) {
            alert("查询失败")
            console.error('查询失败:', err); // 处理上传失败的响应
        }
    });
});

// 按时间和地点查询
document.getElementById('query-button-time-location').addEventListener('click', function() {
    const time = document.querySelector("#query-date").value
    const location = document.querySelector("#query-location").value
    const photoContainer = document.querySelector("#photo-container")
    photoContainer.innerHTML = ""
    $.ajax({
        url: 'http://localhost:8080/img/querybytimeandlocation', 
        type: 'POST',
        data: JSON.stringify({ 
            time: time,
            location: location 
        }), // 封装成对象并转为 JSON 字符串
        contentType: 'application/json', // 设置内容类型为 JSON
        success: function(res) {
            for(let path of res){
                const imgElement = document.createElement('img'); // 创建 img 元素
                imgElement.src = `http://localhost:8080/uploads/${path.img_path}`; // 设置图片源
                imgElement.alt = 'Photo'; // 设置 alt 属性
                imgElement.style.width = '160px'; // 设置宽度
                imgElement.style.margin = '10px'; // 设置边距
                // 将 img 元素添加到容器中
                photoContainer.appendChild(imgElement);
            }
        },
        error: function(err) {
            alert("查询失败")
            console.error('查询失败:', err); // 处理上传失败的响应
        }
    });
});

// 查询所有照片
document.getElementById('query-button-all').addEventListener('click', function() {
    const photoContainer = document.querySelector("#photo-container")
    photoContainer.innerHTML = ""
    $.ajax({
        url: 'http://localhost:8080/img/queryall', 
        type: 'POST',
        contentType: false,
        success: function(res) {
            for(let path of res){
                const imgElement = document.createElement('img'); // 创建 img 元素
                imgElement.src = `http://localhost:8080/uploads/${path.img_path}`; // 设置图片源
                imgElement.alt = 'Photo'; // 设置 alt 属性
                imgElement.style.width = '160px'; // 设置宽度
                imgElement.style.margin = '10px'; // 设置边距
                // 将 img 元素添加到容器中
                photoContainer.appendChild(imgElement);
            }
        },
        error: function(err) {
            alert("查询失败")
            console.error('查询失败:', err); // 处理上传失败的响应
        }
    });
});

function showTab(tab) {
    const uploadTab = document.getElementById('upload');
    const queryTab = document.getElementById('query');
    const uploadLink = document.getElementById('upload-tab');
    const queryLink = document.getElementById('query-tab');

    if (tab === 'upload') {
        uploadTab.style.display = 'block';
        queryTab.style.display = 'none';
        uploadLink.classList.add('active');
        queryLink.classList.remove('active');
    } else {
        uploadTab.style.display = 'none';
        queryTab.style.display = 'block';
        queryLink.classList.add('active');
        uploadLink.classList.remove('active');
    }
}

function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('preview');
        preview.src = e.target.result;
        preview.style.display = 'block'; // 显示预览图
    }
    reader.readAsDataURL(file);
}