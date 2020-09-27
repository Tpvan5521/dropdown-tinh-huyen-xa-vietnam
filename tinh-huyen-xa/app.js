const province = document.getElementById('province');
const district = document.getElementById('district');
const wards = document.getElementById('wards');

function sortArrayByName(item1, item2){
    if (item1.name > item2.name){
        return 1;
    }
    if (item1.name < item2.name){
        return -1;
    }
    return 0;
}


fetch('https://gist.githubusercontent.com/tronginc/fef9d1b1d48e39077a9a377052f5f8e4/raw/4268fd70072c69d1ade84ce09c61926b18c5dbff/vietnam.json?fbclid=IwAR3BeB7aro2Tp0XMcUlUVKGO80aEob8YT_92bITW71zBSv4GxVyST39d8hY')
    .then(response => response.json())
    .then(dt => {

        dt.sort(sortArrayByName);

        const tinhOp = dt.map((tinh, index) => `<option value="${index}">${tinh.name}</option>`)
        province.innerHTML = tinhOp;        

        province.addEventListener('change', (e) => {
            e.preventDefault();                
            
            const arrHuyen = dt[e.target.value].quan_huyen;
            arrHuyen.sort(sortArrayByName);
            
            const huyenOp = arrHuyen.map((huyen, index) => `<option value="${index}">${huyen.name}</option>`)
            huyenOp.unshift('<option selected>Quận/Huyện</option>');
            district.innerHTML = huyenOp;
            wards.innerHTML = '<option selected>Xã/Phường</option>';  
            
        });

        district.addEventListener('change', (e) => {
            e.preventDefault();       
        
            const arrXa = dt[province.value].quan_huyen[e.target.value].xa_phuong;
            arrXa.sort(sortArrayByName);
            
            const xaOp = arrXa.map((xa, index) => `<option value="${index}">${xa.name}</option>`)
            xaOp.unshift('<option selected>Xã/Phường</option>');
            wards.innerHTML = xaOp;      
        })
        wards.addEventListener('change', (e) => {
            e.preventDefault();
        });
    })
