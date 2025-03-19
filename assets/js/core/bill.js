
//   // Get the dropdown and all divs
//   const dropdown = document.getElementById('partyType');
//   const containers = document.querySelectorAll('.invoice-container');

//   // Event listener for dropdown change
//   dropdown.addEventListener('change', function () {
//       const selectedValue = this.value;

//       // Hide all containers
//       containers.forEach(container => {
//           container.style.display = 'none';
//       });

//       // Show the selected container
//       const selectedDiv = document.getElementById(selectedValue);
//       if (selectedDiv) {
//           selectedDiv.style.display = 'block';
//       }
//   });

//   // Initial setup: show the first div by default
//   containers.forEach((container, index) => {
//       container.style.display = index === 0 ? 'block' : 'none';
//   });

//   // PDF generation options
//   const pdfOptions = {
//       margin: 10,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//   };

//   // Share the currently visible invoice
//   document.querySelector('#shareBtn').addEventListener('click', async () => {
//       const visibleInvoice = document.querySelector('.invoice-container[style*="block"]');

//       if (!visibleInvoice) {
//           alert("No invoice selected!");
//           return;
//       }

//       const pdfBlob = await html2pdf().from(visibleInvoice).set(pdfOptions).toPdf().output('blob');

//       const pdfFile = new File([pdfBlob], visibleInvoice.id + ".pdf", { type: 'application/pdf' });

//       // Share the PDF if supported
//       if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
//           try {
//               await navigator.share({
//                   files: [pdfFile],
//                   title: `Invoice: ${visibleInvoice.id}`,
//                   text: 'Here is the selected invoice.'
//               });
//               console.log('Invoice shared successfully!');
//           } catch (err) {
//               console.log("Error sharing PDF:", err);
//           }
//       } else {
//           alert("Your browser doesn't support sharing files!");
//       }
//   });

//   // Download the currently visible invoice
//   document.querySelector('#downloadBtn').addEventListener('click', () => {
//       const visibleInvoice = document.querySelector('.invoice-container[style*="block"]');

//       if (!visibleInvoice) {
//           alert("No invoice selected!");
//           return;
//       }

//       const options = {
//           ...pdfOptions,
//           filename: visibleInvoice.id + '.pdf'
//       };

//       html2pdf().from(visibleInvoice).set(options).save();
//   });

// // Print the currently visible invoice
// document.querySelector('#printBtn').addEventListener('click', () => {
//     const visibleInvoice = document.querySelector('.invoice-container[style*="block"]');

//     if (!visibleInvoice) {
//         alert("No invoice selected!");
//         return;
//     }

//     // Store the original body content
//     const originalContent = document.body.innerHTML;

//     // Create a new print window with the content of the visible invoice
//     document.body.innerHTML = visibleInvoice.outerHTML;

//     // Trigger the print dialog
//     window.print();

//     // Restore the original body content
//     document.body.innerHTML = originalContent;

//     location.reload();
// }); 

 
// // document.getElementById('thermalSwitch').addEventListener('change', function() {
// //     const selectBox = document.getElementById('partyType');
// //     const radioButtons = document.querySelectorAll('#radioGroup input[type="radio"]');

// //     if (this.checked) {
// //       selectBox.disabled = true;
// //       selectBox.title = "Disabled when Thermal Print is selected";
// //       selectBox.style.opacity = "0.5";  // Reduce opacity to indicate disabled state
      
// //       // Enable radio buttons
// //       radioButtons.forEach(radio => {
// //         radio.disabled = false;
// //       });
// //     } else {
// //       selectBox.disabled = false;
// //       selectBox.title = "";
// //       selectBox.style.opacity = "1";  // Restore full opacity
// //       // Disable radio buttons
// //       radioButtons.forEach(radio => {
// //         radio.disabled = true;
// //       });
// //     }
// // });


// document.getElementById('thermalSwitch').addEventListener('change', function() {
//     const selectBox = document.getElementById('partyType');
//     const radioGroup = document.getElementById('radioGroup');
//     const radioButtons = document.querySelectorAll('#radioGroup input[type="radio"]');
//     const invoiceLayouts = document.querySelectorAll('.invoice-layout');

//     if (this.checked) {
//         // Disable the select box and show radio buttons
//         selectBox.disabled = true;
//         selectBox.style.opacity = "0.5";
//         selectBox.title = "Disabled when Thermal Print is selected";
//         radioGroup.style.display = 'flex';

//         // Enable radio buttons
//         radioButtons.forEach(radio => {
//             radio.disabled = false;
//         });

//         // Automatically select the first option (2 inch)
//         radioButtons[0].checked = true;
//         showInvoiceLayout('2inchInvoice');
//     } else {
//         // Enable the select box and hide radio buttons
//         selectBox.disabled = false;
//         selectBox.style.opacity = "1";
//         selectBox.title = "";
//         radioGroup.style.display = 'none';

//         // Disable radio buttons and uncheck them
//         radioButtons.forEach(radio => {
//             radio.disabled = true;
//             radio.checked = false;
//         });

//         // Hide all invoice layouts
//         invoiceLayouts.forEach(layout => {
//             layout.style.display = 'none';
//         });
//     }
// });

// // Event listener for radio button change
// document.querySelectorAll('#radioGroup input[type="radio"]').forEach(radio => {
//     radio.addEventListener('change', function() {
//         const selectedInvoice = this.value + 'Invoice';
//         showInvoiceLayout(selectedInvoice);
//     });
// });

// // Function to show the selected invoice layout and hide others
// function showInvoiceLayout(selectedId) {
//     const invoiceLayouts = document.querySelectorAll('.invoice-layout');
//     invoiceLayouts.forEach(layout => {
//         layout.style.display = 'none';
//     });
//     document.getElementById(selectedId).style.display = 'block';
// }

// here new code

// Step 1: Dropdown to Show/Hide Invoices
const dropdown = document.getElementById('partyType');
const containers = document.querySelectorAll('.invoice-container');

// Event Listener for Dropdown Change
dropdown.addEventListener('change', function () {
    const selectedValue = this.value;
    
    containers.forEach(container => {
        container.style.display = 'none';  // Hide all containers
    });

    const selectedDiv = document.getElementById(selectedValue);
    if (selectedDiv) {
        selectedDiv.style.display = 'block';  // Show the selected one
    }
});

// Initial Setup: Show First Invoice by Default
containers.forEach((container, index) => {
    container.style.display = index === 0 ? 'block' : 'none';
});

// Step 2: Thermal Switch Logic
const thermalSwitch = document.getElementById('thermalSwitch');
const radioGroup = document.getElementById('radioGroup');
const radioButtons = document.querySelectorAll('#radioGroup input[type="radio"]');

thermalSwitch.addEventListener('change', function () {
    if (this.checked) {
        dropdown.disabled = true;
        dropdown.style.opacity = "0.5";
        radioGroup.style.display = 'block';

       thermalSwitch.style.backgroundColor="green";

        // Hide Dropdown Invoices and Show Thermal Invoice
        containers.forEach(container => container.style.display = 'none');
        document.getElementById('2inchInvoice').style.display = 'block';
    } else {
        dropdown.disabled = false;
        dropdown.style.opacity = "1";
        radioGroup.style.display = 'none';
        thermalSwitch.style.backgroundColor="";
       
        // Show Selected Dropdown Invoice
        document.getElementById(dropdown.value).style.display = 'block';
        radioButtons.forEach(radio => radio.checked = false);
        document.querySelectorAll('.invoice-layout').forEach(layout => {
            layout.style.display = 'none';
        });
    }
});

// Step 3: Show Different Thermal Invoice Based on Radio Selection
// radioButtons.forEach(radio => {
//     radio.addEventListener('change', function () {
//         document.querySelectorAll('.invoice-layout').forEach(layout => {
//             layout.style.display = 'none';
//         });
//         document.getElementById(this.value + 'Invoice').style.display = 'block';
//     });
// });

// Step:3 Adjust Invoice Layout Size Based on Radio Selection
radioButtons.forEach(radio => {
    radio.addEventListener('change', function () {
        const invoiceLayout = document.querySelector('.invoice-layout');
        if (invoiceLayout) {
            // Reset the width dynamically based on the selected radio button value
            if (this.value === '2inch') {
                invoiceLayout.style.width = '58mm'; // 2-inch width
            } else if (this.value === '3inch') {
                invoiceLayout.style.width = '76mm'; // 3-inch width
            } else if (this.value === '4inch') {
                invoiceLayout.style.width = '88mm'; // 4-inch width
            }
        }
    });
});


// Step 4: PDF Generation and Download
const pdfOptions = {
    margin: 10,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
};

document.querySelector('#downloadBtn').addEventListener('click', () => {
    const visibleInvoice = document.querySelector('.invoice-container[style*="block"], .invoice-layout[style*="block"]');
    
    if (!visibleInvoice) {
        alert("No invoice selected!");
        return;
    }
    const options = { ...pdfOptions, filename: visibleInvoice.id + '.pdf' };
    html2pdf().from(visibleInvoice).set(options).save();
});

// Step 5: Print Invoice
document.querySelector('#printBtn').addEventListener('click', () => {
    const visibleInvoice = document.querySelector('.invoice-container[style*="block"], .invoice-layout[style*="block"]');

    if (!visibleInvoice) {
        alert("No invoice selected!");
        return;
    }

    const originalContent = document.body.innerHTML;
    document.body.innerHTML = visibleInvoice.outerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    location.reload();
});


// for share
document.querySelector('#shareBtn').addEventListener('click', async () => {
    const visibleInvoice = document.querySelector('.invoice-container[style*="block"], .invoice-layout[style*="block"]');

    if (!visibleInvoice) {
        alert("No invoice selected!");
        return;
    }

    const pdfBlob = await html2pdf().from(visibleInvoice).set(pdfOptions).toPdf().output('blob');
    const pdfFile = new File([pdfBlob], visibleInvoice.id + ".pdf", { type: 'application/pdf' });

    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        try {
            await navigator.share({
                files: [pdfFile],
                title: `Invoice: ${visibleInvoice.id}`,
                text: 'Here is the selected invoice.'
            });
            console.log('Invoice shared successfully!');
        } catch (err) {
            console.error("Error sharing PDF:", err);
        }
    } else {
        alert("Sharing not supported. Downloading PDF...");
        const options = {
            ...pdfOptions,
            filename: visibleInvoice.id + '.pdf'
        };
        html2pdf().from(visibleInvoice).set(options).save();
    }
});


// Integrated all bill here


document.addEventListener("DOMContentLoaded", function () {
    const invoiceContainer = document.getElementById("2inchInvoice");

    if (invoiceContainer) {
        fetch("thermal.html")
            .then(response => response.text())
            .then(data => {
                invoiceContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading invoice template:", error));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const invoiceContainer = document.getElementById("invoice");

    if (invoiceContainer) {
        fetch("modern.html")
            .then(response => response.text())
            .then(data => {
                invoiceContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading invoice template:", error));
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const invoiceContainer = document.getElementById("invoice2");

    if (invoiceContainer) {
        fetch("billbook.html")
            .then(response => response.text())
            .then(data => {
                invoiceContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading invoice template:", error));
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const invoiceContainer = document.getElementById("invoice3");

    if (invoiceContainer) {
        fetch("stylish.html")
            .then(response => response.text())
            .then(data => {
                invoiceContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading invoice template:", error));
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const invoiceContainer = document.getElementById("invoice4");

    if (invoiceContainer) {
        fetch("gsttheme.html")
            .then(response => response.text())
            .then(data => {
                invoiceContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading invoice template:", error));
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const invoiceContainer = document.getElementById("invoice5");

    if (invoiceContainer) {
        fetch("basictheme.html")
            .then(response => response.text())
            .then(data => {
                invoiceContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading invoice template:", error));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const invoiceContainer = document.getElementById("invoice6");

    if (invoiceContainer) {
        fetch("modernBill.html")
            .then(response => response.text())
            .then(data => {
                invoiceContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading invoice template:", error));
    }
});



// document.addEventListener('DOMContentLoaded', () => {
//     const invoiceContainer = document.getElementById('2inchInvoice');
//     const shadow = invoiceContainer.attachShadow({ mode: 'open' });

//     shadow.innerHTML = `
//             <style>
//         /* body {
//             width: 55mm;
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//             font-size: 10px;
//         } */
//         .invoice-container .thermal {
           
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//             font-size: 10px;
//             width: 58mm;
//             /* margin: -4px; */
//             color: #000;
//             padding: 0;
//             max-width: 80mm;
//         }
//         .thermal h1 {
//             font-size: 14px;
//             text-align: center;
//             margin: 5px 0;
//         }
//        .thermal .invoice-header, .invoice-footer {
//             text-align: center;
//             margin-bottom: 5px;
//         }
//         .thermal .invoice-details, .items-table, .summary {
//             width: 100%;
//         }
//        .thermal .items-table th, .items-table td {
//             border-bottom: 1px dotted #000;
//             padding: 2px 0;
//             text-align: left;
//         }
//         .thermal .items-table th {
//             font-weight: bold;
//         }
//         .thermal .summary td {
//             padding: 2px 0;
//         }

//         @media print {
//             body {
//                 width: 58mm;
//             }
//             @page {
//                 size: 58mm auto;
//                 margin: 0;
//             }
//         }
//     </style>
//     <div class="invoice-container">
//         <div class="thermal">
//         <div class="invoice-header">
//             <h1>chawdi</h1>
//             <p>Tax Invoice</p>
//             <p>drug_key: <strong>ddc</strong></p>
//             <p>email_key: <strong>ddc</strong></p>
//             <p>fassai_key: <strong>fvbn</strong></p>
//         </div>
//         <hr>
//         <table class="invoice-details">
//             <tr>
//                 <td>Bill No: <strong>S123123456789098</strong></td>
//                 <td class="text-right">25 Dec, 2024 1:57 PM</td>
//             </tr>
//             <tr>
//                 <td colspan="2">Bill To: <strong>Sampath Singh</strong></td>
//             </tr>
//             <tr>
//                 <td colspan="2">Address: 04, KK Buildings, Main Street, Karol Bagh, New Delhi, Delhi qWERSTYUIOP ERDTFYGUHJKL WRTYGJNKM ARWERESRTDRFYTGYHJK</td>
//             </tr>
//             <tr>
//                 <td colspan="2">Phone: <strong>+91 9981028177</strong></td>
//             </tr>
//             <tr>
//                 <td colspan="2">Place of Supply: Delhi</td>
//             </tr>
//         </table>
//         <hr>
//         <table class="items-table" style="width: 100%; border-collapse: collapse;">
//             <tr>
//                 <th>#</th>
//                 <th>Items/Qty</th>
//                 <th class="text-right">Price</th>
//                 <th class="text-right">Amount</th>
//             </tr>
//             <tr>
//                 <td><b>1</b></td>
//                 <td style="word-wrap: break-word; word-break: break-word; max-width: 200px;">
//                     apple banana gauva litchi green apole orsnge<br>
//                     <small>GST 5% HSN: 808</small><br>5 KG
//                 </td>
//                 <td class="text-right" style="word-wrap: break-word; word-break: break-word;">₹100544545456.00</td>
//                 <td class="text-right" style="word-wrap: break-word; word-break: break-word;">₹52597787887.00</td>
//             </tr>
//         </table>
        
//         <table class="summary">
//             <tr>
//                 <td>Sub Total</td>
//                 <td class="text-right">₹3456789079765430.01</td>
//             </tr>
//             <tr>
//                 <td>Extra Charge (ex 5% GST)</td>
//                 <td class="text-right">₹10034566778909.00</td>
//             </tr>
//             <tr>
//                 <td>Taxable Amount</td>
//                 <td class="text-right">₹16003456789.00</td>
//             </tr>
//             <tr>
//                 <td>CGST @ 2.5%</td>
//                 <td class="text-right">₹4024356789.00</td>
//             </tr>
//             <tr>
//                 <td>SGST @ 2.5%</td>
//                 <td class="text-right">₹4024356789.00</td>
//             </tr>
//             <tr>
//                 <td>Discount</td>
//                 <td class="text-right">- ₹5032456789.00</td>
//             </tr>
//             <tr>
//                 <td><strong>Total Amount</strong></td>
//                 <td class="text-right"><strong>₹1630234567890.00</strong></td>
//             </tr>
//             <tr>
//                 <td>Received Amount</td>
//                 <td class="text-right">₹1000.00</td>
//             </tr>
//         </table>
//         <hr>
//         <div class="invoice-footer">
//             <p>Thank you for your business!</p>
//         </div>
//     </div>
//     </div>
//     `;
// });


// change the color

const colorPicker = document.getElementById("colorPicker");

// Function to apply color dynamically
function applyColor(color) {
  document
    .querySelectorAll(".highlighted-bg, .changeHeader th, .summary-table th, .bgChanger")
    .forEach((el) => {
      el.style.backgroundColor = color;

      // Calculate brightness
      const brightness = getBrightness(color);

      // Set text color based on brightness
      el.style.color = brightness > 128 ? "black" : "white";
    });
    const elements = document.querySelectorAll(".changeColor, .headText");
if (elements.length > 0) {
  elements.forEach((el) => {
    el.style.color = color;
  });
} else {
  console.warn("No elements found with class 'changeColor'.");
}

//   const element = document.getElementById("changeColor");
//   if (element) {
//     element.style.color = color;
//   } else {
//     console.warn(`Element with ID '${id}' not found.`);
//   }
}

// Function to calculate brightness of a color
function getBrightness(hex) {
  let r = parseInt(hex.substr(1, 2), 16); // Red
  let g = parseInt(hex.substr(3, 2), 16); // Green
  let b = parseInt(hex.substr(5, 2), 16); // Blue
  return (r * 299 + g * 587 + b * 114) / 1000; // Luminance formula
}

// Apply color from the color picker
colorPicker.addEventListener("input", function () {
  applyColor(colorPicker.value);
});
