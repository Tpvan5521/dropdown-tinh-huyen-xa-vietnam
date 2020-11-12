// Select output elements
const province = document.getElementById('province');
const district = document.getElementById('district');
const wards = document.getElementById('wards');

// Sort by name
function sortArrayByName(item1, item2){
    if (item1.name < item2.name)
        return -1;
    if (item1.name > item2.name)
        return 1;
    return 0;
}

// Load data to UI
async function loadData(data) {
    return new Promise((resolve, reject) => {
        data.sort(sortArrayByName);

        const tinhOp = data.map((tinh, index) => `<option value="${index}">${tinh.name}</option>`)
        province.innerHTML = tinhOp;        
    
        province.addEventListener('change', (e) => {
            e.preventDefault();                
            
            const arrHuyen = data[e.target.value].quan_huyen;
            arrHuyen.sort(sortArrayByName);
            
            const huyenOp = arrHuyen.map((huyen, index) => `<option value="${index}">${huyen.name}</option>`)
            huyenOp.unshift('<option selected>Quận/Huyện</option>');
            district.innerHTML = huyenOp;
            wards.innerHTML = '<option selected>Xã/Phường</option>';  
            
        })
    
        district.addEventListener('change', (e) => {
            e.preventDefault();       
        
            const arrXa = data[province.value].quan_huyen[e.target.value].xa_phuong;
            arrXa.sort(sortArrayByName);
            
            const xaOp = arrXa.map((xa, index) => `<option value="${index}">${xa.name}</option>`)
            xaOp.unshift('<option selected>Xã/Phường</option>');
            wards.innerHTML = xaOp;      
        })

        wards.addEventListener('change', (e) => {
            e.preventDefault();
        })

        // Always success
        return resolve();
    })
}

const JSON_URL = 'https://gist.githubusercontent.com/tronginc/' +
    'fef9d1b1d48e39077a9a377052f5f8e4/raw/' + 
    '4268fd70072c69d1ade84ce09c61926b18c5dbff/vietnam.json';

// Try to get data as JSON
fetch(JSON_URL)
    // Parse data from JSON to JS object
    .then(response => response.json())

    // Load parsed data to UI
    .then(parsedData => loadData(parsedData))

    // Using local data instead when there's no connection
    .catch(() => loadData(data));