const prisma = require('../lib/prisma');

const getCabins = async (req, res) => {
  try {
    const cabins = await prisma.cabin.findMany({
        include: {
            images: true,
            bookings: true,
            reviews: true,
            availability: true,
        },
    });
    res.json(cabins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCabins };