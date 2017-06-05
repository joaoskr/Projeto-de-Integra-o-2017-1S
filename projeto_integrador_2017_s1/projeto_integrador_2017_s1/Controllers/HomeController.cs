using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;

namespace projeto_integrador_2017_s1.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index ()
		{
			ViewBag.Model1 = "active";
			ViewBag.Title = "Projeto de Integração";
			return View ();
		}
		public ActionResult Circuitos ()
		{
			ViewBag.Model2 = "active";
			ViewBag.Title = "Circuitos Digitais";
			return View ();
		}
		public ActionResult Estrutura ()
		{
			ViewBag.Model3 = "active";
			ViewBag.Title = "Estrutura de Dados I";
			return View ();
		}
		public ActionResult Sistemas ()
		{
			ViewBag.Model4 = "active";
			ViewBag.Title = "Fundamentos de Sistemas de Informação";
			return View ();
		}
	}
}
