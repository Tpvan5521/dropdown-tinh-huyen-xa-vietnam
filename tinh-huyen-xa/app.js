const province = document.getElementById('province');
const district = document.getElementById('district');
const wards = document.getElementById('wards');
const arrTinh = [];
const arrHuyen = [];
const arrXa = [];

fetch('https://gist.githubusercontent.com/tronginc/fef9d1b1d48e39077a9a377052f5f8e4/raw/4268fd70072c69d1ade84ce09c61926b18c5dbff/vietnam.json?fbclid=IwAR3BeB7aro2Tp0XMcUlUVKGO80aEob8YT_92bITW71zBSv4GxVyST39d8hY')
    .then(response => response.json())
    .then(dt => {

        dt.forEach(tinh => {
            arrTinh.push(tinh.name);
        });

        arrTinh.sort();

        for (var i = 0; i < arrTinh.length; i++) {
            const tinhOp = `
            <option>` + arrTinh[i] + `</option>
            `;
            province.innerHTML += tinhOp;
        }

        province.addEventListener('change', (e) => {
            e.preventDefault();

            // drop
            district.value = '';
            district.innerHTML = `
            <option selected>Quận/Huyện</option>
            `;
            wards.value = '';
            wards.innerHTML = `
            <option selected>Xã/Phường</option>
            `;
            arrHuyen = [];
            arrXa = [];

            dt.forEach(tinh => {
                if (tinh.name == province.value) {
                    // console.log(province.value);
                    tinh.quan_huyen.forEach(huyen => {
                        arrHuyen.push(huyen.name);
                        // console.log(huyen.name);
                    })
                }
            });

            arrHuyen.sort();

            for (var i = 0; i < arrHuyen.length; i++) {
                const huyenOp = `
                <option>` + arrHuyen[i] + `</option>
                `
                district.innerHTML += huyenOp;
                // console.log();
            }
            //hết drop

            district.addEventListener('change', (e) => {
                e.preventDefault();
                wards.value = '';
                wards.innerHTML = `
                <option selected>Xã/Phường</option>
                `;
                arrXa = [];

                dt.forEach(tinh => {
                    if (tinh.name == province.value) {
                        tinh.quan_huyen.forEach(huyen => {
                            if (huyen.name == district.value) {
                                huyen.xa_phuong.forEach(xa => {
                                    arrXa.push(xa.name);
                                })
                            }
                        })
                    }
                });

                arrXa.sort();

                for (var i = 0; i < arrXa.length; i++) {
                    const xaOp = `
                    <option>` + arrXa[i] + `</option>
                    `
                    wards.innerHTML += xaOp;
                    // console.log();
                }

                wards.addEventListener('change', (e) => {
                    e.preventDefault();
                });

            })
        });
    })
