// =====================================
// LHDN RECEIPT ENGINE (PRODUCTION CORE)
// =====================================

class ReceiptEngine {

    // =========================
    // GET ALL RECEIPTS
    // =========================
    static getAll() {
        return JSON.parse(localStorage.getItem("receipts")) || [];
    }

    // =========================
    // SAVE ALL RECEIPTS
    // =========================
    static saveAll(receipts) {
        localStorage.setItem("receipts", JSON.stringify(receipts));
    }

    // =========================
    // CREATE RECEIPT (CORE MODEL)
    // =========================
    static create(data) {

        const amount = parseFloat((data.amount || "0").toString().replace(/[^\d.]/g, ""));
        const tax = amount * 0.06;
        const total = amount + tax;

        return {
            id: data.id || ("RCPT-" + Date.now()),
            createdAt: new Date().toISOString(),

            image: data.image || "",

            amount: amount,
            date: data.date || "Unknown",

            vendor: data.vendor || "Unknown Vendor",

            tax: tax,
            total: total,

            rawText: data.rawText || "",

            status: "pending",

            meta: {
                source: data.source || "scanner",
                version: "1.0"
            }
        };
    }

    // =========================
    // ADD RECEIPT
    // =========================
    static add(receipt) {
        const receipts = this.getAll();
        receipts.push(receipt);
        this.saveAll(receipts);
        return receipt;
    }

    // =========================
    // FIND RECEIPT
    // =========================
    static find(id) {
        return this.getAll().find(r => r.id == id);
    }

    // =========================
    // UPDATE RECEIPT
    // =========================
    static update(id, newData) {
        const receipts = this.getAll();

        const updated = receipts.map(r => {
            if (r.id == id) {
                return { ...r, ...newData };
            }
            return r;
        });

        this.saveAll(updated);
    }

    // =========================
    // DASHBOARD STATS ENGINE
    // =========================
    static stats() {

        const receipts = this.getAll();

        const total = receipts.length;
        const verified = receipts.filter(r => r.status === "verified").length;
        const pending = receipts.filter(r => r.status === "pending").length;

        const totalTax = receipts.reduce((sum, r) => {
            return sum + (r.tax || 0);
        }, 0);

        const totalAmount = receipts.reduce((sum, r) => {
            return sum + (r.amount || 0);
        }, 0);

        return {
            total,
            verified,
            pending,
            totalTax,
            totalAmount
        };
    }

}
