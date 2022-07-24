loops.everyInterval(10, function () {
    let moving = 0
    serial.writeLine("" + (moving))
    if (moving == 0) {
        olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.forward, 0)
    }
    if (moving == 1) {
        olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.forward, 1)
    }
    if (moving == 2) {
        olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.backward, 1)
    }
    if (moving == 3) {
        olca_plot_car.plot_RL_cycle(olca_plot_car.plotter_RL.Right, 1)
    }
    if (moving == 4) {
        olca_plot_car.plot_RL_cycle(olca_plot_car.plotter_RL.left, 1)
    }
})
