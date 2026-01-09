import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo-nobg.png";

export const downloadInvoice = (booking) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pricePerHour = 30000; // Default price per hour
  const totalHour = booking.totalHour ?? booking.slotTime?.length ?? 0;
  const amount = booking.amount ?? pricePerHour * totalHour;

  const primaryColor = "#0f766e";
  const gray = "#6b7280";

  /* ================= HEADER ================= */
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, "F");

  // LOGO
  doc.addImage(logo, "PNG", 14, 8, 24, 24);

  doc.setTextColor("#ffffff");
  doc.setFontSize(18);
  doc.text("INVOICE", 45, 20);

  doc.setFontSize(10);
  doc.text("Bukti Pemesanan Lapangan", 45, 27);

  /* ================= INFO ================= */
  doc.setTextColor("#000");
  doc.setFontSize(11);

  const startY = 50;

  const info = [
    ["Invoice ID", booking.bookingId],
    ["Nama", booking.userData?.name ?? "-"],
    ["Lapangan", booking.lapanganData?.name ?? "-"],
    ["Tanggal", booking.slotDate.replaceAll("_", " ")],
    ["Jam", booking.slotTime.join(", ")],
    ["Durasi", `${totalHour} Jam`],
  ];

  info.forEach((row, i) => {
    doc.text(row[0], 14, startY + i * 8);
    doc.text(":", 45, startY + i * 8);
    doc.text(String(row[1]), 50, startY + i * 8);
  });

  /* ================= TABLE ================= */
  autoTable(doc, {
    startY: startY + 55,
    head: [["Deskripsi", "Detail", "Subtotal"]],
    body: [
      [
        "Harga per Jam",
        `${totalHour} x Rp ${pricePerHour.toLocaleString("id-ID")}`,
        `Rp ${(pricePerHour * totalHour).toLocaleString("id-ID")}`,
      ],
    ],
    theme: "striped",
    headStyles: {
      fillColor: [15, 118, 110],
      textColor: 255,
    },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center" },
      2: { halign: "right" },
    },
  });

  /* ================= TOTAL ================= */
  const finalY = doc.lastAutoTable.finalY;

  doc.setFontSize(12);
  doc.setTextColor(primaryColor);
  doc.text("TOTAL BAYAR", 130, finalY + 12);

  doc.setFontSize(14);
  doc.text(
    `Rp ${amount.toLocaleString("id-ID")}`,
    130,
    finalY + 20
  );

  /* ================= STATUS ================= */
  doc.setFontSize(11);
  doc.setTextColor("#16a34a");
  doc.text("Status Pembayaran : LUNAS", 14, finalY + 20);

  /* ================= FOOTER ================= */
  doc.setFontSize(9);
  doc.setTextColor(gray);
  doc.text(
    "Invoice ini adalah bukti resmi pemesanan.\nHarap tunjukkan invoice ini saat datang ke lokasi.",
    14,
    285
  );

  doc.save(`Invoice-${booking.bookingId}.pdf`);
};
