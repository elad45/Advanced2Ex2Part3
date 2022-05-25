using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReviewsPart2.Data;
using ReviewsPart2.Models;

namespace ReviewsPart2.Controllers
{
    public class ReviewsController : Controller
    {
        private readonly ReviewsPart2Context _context;

        public ReviewsController(ReviewsPart2Context context)
        {
            _context = context;
        }

        // GET: Reviews
        public async Task<IActionResult> Index()
        {
              return _context.Review != null ? 
                          View(await _context.Review.ToListAsync()) :
                          Problem("Entity set 'ReviewsPart2Context.Review'  is null.");
        }

        public async Task<IActionResult> Search()
        {
            return _context.Review != null ?
                        View(await _context.Review.ToListAsync()) :
                        Problem("Entity set 'ReviewsPart2Context.Review'  is null.");
        }

        [HttpPost]
        public async Task<IActionResult> Search(string query) //string name is query because of the "name" we gave is query
        {
            var q = from review in _context.Review
                    where review.Name.Contains(query) ||
                          review.Feedback.Contains(query)
                    select review;
            return View(await q.ToListAsync());
        }
        /*return _context.Review != null ?
                    View(await _context.Review.ToListAsync()) :
                    Problem("Entity set 'ReviewsPart2Context.Review'  is null.");
        } */

        [HttpPost]
        public async Task<IActionResult> Search2(string query) //string name is query because of the "name" we gave is query
        {
           
            if (query == null)
            {
                 var q = _context.Review;
                return PartialView(await q.ToListAsync());
            }
            else
            {
                 var q = _context.Review.Where(review => review.Name.Contains(query) ||
                                                        review.Feedback.Contains(query));
                return PartialView(await q.ToListAsync());
            }
        }

        public async Task<IActionResult> Search3(string query) //string name is query because of the "name" we gave is query
        {
            var q = _context.Review.Where(review => review.Name.Contains(query) ||
                                                    review.Feedback.Contains(query));
            return Json(await q.ToListAsync());
        
        }
        // GET: Reviews/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Review == null)
            {
                return NotFound();
            }

            var review = await _context.Review
                .FirstOrDefaultAsync(m => m.Id == id);
            if (review == null)
            {
                return NotFound();
            }

            return View(review);
        }

        // GET: Reviews/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Reviews/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Feedback,Rating,Date")] Review review)
        {
            if (ModelState.IsValid)
            {
                review.Date = DateTime.Now;
                _context.Add(review);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(review);
        }

        // GET: Reviews/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Review == null)
            {
                return NotFound();
            }

            var review = await _context.Review.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return View(review);
        }

        // POST: Reviews/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Feedback,Rating,Date")] Review review)
        {
            if (id != review.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(review);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReviewExists(review.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(review);
        }

        // GET: Reviews/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Review == null)
            {
                return NotFound();
            }

            var review = await _context.Review
                .FirstOrDefaultAsync(m => m.Id == id);
            if (review == null)
            {
                return NotFound();
            }

            return View(review);
        }

        // POST: Reviews/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Review == null)
            {
                return Problem("Entity set 'ReviewsPart2Context.Review'  is null.");
            }
            var review = await _context.Review.FindAsync(id);
            if (review != null)
            {
                _context.Review.Remove(review);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ReviewExists(int id)
        {
          return (_context.Review?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
