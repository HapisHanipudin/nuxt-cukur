<template>
  <div class="flex flex-col w-full container mx-10 my-16 gap-3 items-center">
    <div class="flex justify-between w-full items-center">
      <h1 class="text-gold-700 font-black font-sans text-3xl">History Cukur</h1>
      <UIButton v-if="cukurData.queues.length > 0" @click="download()" class="flex gap-2 w-64 justify-center" font="bold"><DownloadIcon class="w-6 h-6" />Unduh Data</UIButton>
    </div>
    <div class="border overflow-hidden w-full rounded-3xl bg-neutral-800/20">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="w-16">No</th>
            <th>Nama Santri</th>
            <th class="w-32">Tiket</th>
            <th class="w-32">Status</th>
            <th class="w-32">Durasi</th>
            <th class="w-32">Status Pembayaran</th>

            <th class="w-32">Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" v-for="i in 10" class="border-b font-semibold">
            <td class="p-3 text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="font-bold"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
          </tr>
          <tr
            v-motion="{
              initial: { opacity: 0, x: 100 + '%' },
              enter: {
                transition: {
                  delay: index * 100,
                  duration: 400,
                },
                opacity: 1,
                x: 0,
              },
            }"
            :class="{ 'bg-neutral-800/70': index % 2 === 0, 'text-gold-400': cukur.ticket == 'VIP' }"
            class="border-b font-semibold"
            v-for="(cukur, index) in cukurData.queues"
            :key="cukur.id"
          >
            <td class="p-3 text-center">{{ cukur.queueNumber }}</td>
            <td class="font-semibold text-lg">
              {{ cukur.santri.name }}
            </td>
            <td class="text-center">{{ cukur.ticket }}</td>
            <td class="text-center">{{ cukur.status }}</td>
            <td class="text-center">{{ cukur.durasi }}</td>
            <td class="text-center">
              <input
                v-if="session.isAdmin"
                @keyup.enter="updatePaymentStatus(cukur.id, $event.target.value)"
                class="bg-transparent"
                type="text"
                :value="cukur.ticket == 'VIP' ? (cukur.paymentStatus != 20000 ? cukur.paymentStatus - 20000 : 'Lunas') : cukur.ticket == 'REGULER' ? (cukur.paymentStatus != 16000 ? cukur.paymentStatus - 16000 : 'Lunas') : 'Lunas'"
              />
              <span v-else>{{
                cukur.ticket == "VIP" ? (cukur.paymentStatus != 20000 ? cukur.paymentStatus - 20000 : "Lunas") : cukur.ticket == "REGULER" ? (cukur.paymentStatus != 16000 ? cukur.paymentStatus - 16000 : "Lunas") : "Lunas"
              }}</span>
            </td>
            <td class="text-center">{{ cukur.payment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ArrowDownTrayIcon as DownloadIcon } from "@heroicons/vue/24/outline";
const session = useSessionStore();
const isLoading = ref(true);
const cukurData = ref({
  cukur: {},
  queues: [],
});

const profit = ref(0);

const updatePaymentStatus = async (id, value) => {
  const res = await $fetch(`/api/queue/${id}/`, {
    method: "POST",
    body: {
      paymentStatus: parseInt(value),
    },
  });
  if (res) {
    await getCukur();
  }
};

const viaSaldo = computed(() => {
  return cukurData.value.queues.filter((cukur) => {
    return cukur.payment === "SALDO";
  });
});
const getCukur = async () => {
  const id = useRoute().params.id;
  const res = await $fetch(`/api/cukur/${id}/history`);
  if (res) {
    cukurData.value = res;
    let num = 0;
    num += cukurData.value?.vip.length * 5000;
    num += cukurData.value?.reg.length * 1000;
    profit.value = num;
  }
};

onBeforeMount(async () => {
  isLoading.value = true;
  await getCukur();
  isLoading.value = false;
});

import jsPDF from "jspdf";
const download = () => {
  const queues = cukurData.value.queues;
  if (!queues || queues.length === 0) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const headers = [
    { label: "No", width: 10 },
    { label: "Nama Santri", width: 60 },
    { label: "Tiket", width: 20 },
    { label: "Status", width: 25 },
    // { label: "Durasi", width: 20 },
    { label: "Keterangan", width: 20 },
    { label: "Pembayaran", width: 20 },
  ];

  // Set initial position for drawing text
  let x = 10;
  let y = 10;

  // Draw title
  doc.setFontSize(16);
  doc.text("Data " + cukurData.value.cukur.name, x, y);
  y += 10;

  // Draw table headers
  doc.setFontSize(10);
  headers.forEach((header) => {
    doc.text(header.label, x, y);
    doc.line(x, y + 2, x + header.width, y + 2);
    x += header.width;
  });
  y += 5;

  // Draw table rows
  let rowNum = 1;
  queues.forEach((cukur) => {
    x = 10; // Reset x position for each row
    y += 5; // Increment y position for each row
    const paymentStatus = cukur.ticket == "VIP" ? (cukur.paymentStatus != 20000 ? cukur.paymentStatus - 20000 : "Lunas") : cukur.ticket == "REGULER" ? (cukur.paymentStatus != 16000 ? cukur.paymentStatus - 16000 : "Lunas") : "Lunas";
    const rowData = [rowNum, cukur.santri.name, cukur.ticket, cukur.status, paymentStatus, cukur.payment];
    rowData.forEach((text, index) => {
      doc.text(String(text), x, y);
      x += headers[index].width;
    });
    rowNum++;
  });
  x = 10;
  y += 5;
  // Draw table headers
  doc.setFontSize(10);
  headers.forEach((header) => {
    doc.line(x, y + 2, x + header.width, y + 2);
    x += header.width;
  });
  x = 10;
  y += 10;
  doc.text("Total Profit: " + profit.value, x, y);
  y += 5;
  let saldo = 0;
  viaSaldo.value.forEach((cukur) => {
    if (cukur.ticket === "VIP") {
      saldo += 20000;
    } else {
      saldo += 15000;
    }
  });
  doc.text("Total Bayar: " + queues.length * 15000, x, y);
  y += 5;
  doc.text("Total Ambil Saldo: " + saldo, x, y);
  y += 5;
  let udhBayar = 0;
  queues.forEach((queue) => {
    udhBayar += queue.paymentStatus;
  });

  doc.text("Total Sudah Bayar : " + udhBayar, x, y);
  y += 5;
  doc.text("Total Uang Yg Dipegang (Kalo Semua Udh Bayar): " + (queues.length * 15000 - profit.value), x, y);
  doc.save("cukur-history.pdf");
};
</script>
