const { create, getById, update, deleteById } = require('../services/carService');
const { parseError } = require('../util/parser');

const carController = require('express').Router();

carController.get('/:id/details', async (req, res) => {
    const car = await getById(req.params.id)

    if (car.owner == req.user._id) {
        car.isOwner = true;
    }else if (car.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        car.isBooked = true;
    }
    res.render('details', {
        title: 'Car Details',
        car
    });
});

carController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Car'
    });
});

carController.post('/create', async (req, res) => {
    const car = {
        name: req.body.name,
        brand: req.body.brand,
        imageUrl: req.body.imageUrl,
        year: Number(req.body.year),
        licens: req.body.licens,
        description: req.body.licens,
        owner: req.user._id,
    };


    try {
        if (Object.values(car).some(v => !v)) {
            throw new Error('All fields are required')
        }

        await create(car);
        res.redirect('/')
    } catch (err) {
        res.render('create', {
            title: 'Create Car',
            body: car,
            errors: parseError(err)
        });
    }
});

carController.get('/:id/edit', async (req, res) => {
    const car = await getById(req.params.id);

    if (car.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    res.render('edit', {
        title: 'Edit Car',
        car
    });
});

carController.post('/:id/edit', async (req, res) => {
    const car = await getById(req.params.id);

    if (car.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    const edited = {
        name: req.body.name,
        brand: req.body.brand,
        imageUrl: req.body.imageUrl,
        year: Number(req.body.year),
        licens: req.body.licens,
        description: req.body.licens,
        owner: req.user._id
    };


    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required')
        }

        await update(req.params.id, edited);
        res.redirect(`/car/${req.params.id}/details`)
    } catch (err) {

        res.render('edit', {
            title: 'Edit Car',
            car: Object.assign(edited, { _id: req.params.id }),
            errors: parseError(err)
        });

    }
});

carController.get('/:id/delete', async (req, res) => {
    const car = await getById(req.params.id);

    if (car.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    await deleteById(req.params.id);
    res.redirect('/')
});

// carController.get('/:id/book', async (req, res) => {
//     const car = await getById(req.params.id);

//     try {
//         if (car.owner == req.user._id) {
//             car.isOwner = true;
//             throw new Error('Cannot book yout own car')
//         }
//         if (car.bookings.map(b => b.toString()).includes(req.user._id.toString())){
//             car.isBooked = true;
//             throw new Error('Cannot book twice')
//         }


//         await bookRoom(req.params.id,  req.user._id);
//         res.redirect(`/car/${req.params.id}/details`)
//     } catch (err) {
//      res.render('details', {
//         title: 'Car Details',
//         car,
//         errors: parseError(err)
//      });
//     }
// });


module.exports = carController